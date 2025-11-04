import { NameComponent } from "@/components/name-component";

export default async function Home() {
  return (
    <div className="min-h-screen space-y-12 flex flex-col justify-center items-center">
      <div className="mt-40 space-y-12  flex items-center justify-center flex-col">
        <h1 className="text-7xl font-bold mb-4">Welcome to Gitrank</h1>
        <p className="text-2xl text-gray-600">
          Your go-to platform for Git repository comparison.
        </p>
      </div>
      <NameComponent />
    </div>
  );
}
