import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const page = searchParams.get("page") || "1";
  const perPage = 25;
  const Pages = parseInt(page) * perPage;

  if (!location)
    return NextResponse.json({ error: "Missing location" }, { status: 400 });

  const url = `https://api.github.com/search/users?q=location:${encodeURIComponent(
    location
  )}&per_page=${Pages}`;
  const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    "User-Agent": "GitRank-App",
  };

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 }, // cache for 1 min
  });

  const data = await res.json();

  // Fetch detailed info for each user
  const detailedUsers = await Promise.all(
    data.items.map(async (user: any) => {
      const detailRes = await fetch(
        `https://api.github.com/users/${user.login}`,
        {
          headers,
          next: { revalidate: 60 }, // cache for 1 min
        }
      );
      const detail = await detailRes.json();
      return {
        login: user.login,
        avatar_url: detail.avatar_url,
        html_url: detail.html_url,
        followers: detail.followers || 0,
        public_repos: detail.public_repos || 0,
        public_gists: detail.public_gists || 0,
        score:
          (detail.followers || 0) * 2 +
          (detail.public_repos || 0) +
          (detail.public_gists || 0) * 0.5, // scoring formula
      };
    })
  );

  // Sort users by score
  detailedUsers.sort((a, b) => b.score - a.score);

  return NextResponse.json({ users: detailedUsers });
}
