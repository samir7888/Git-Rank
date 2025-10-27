import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge, User } from "lucide-react";
import { UserType } from "@/types/users-type";

export function UserTable({
    data,
    tableHeader,
}: {
    data: UserType[];
    tableHeader: string[];
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {tableHeader.map((header, i) => (
                        <TableHead key={i}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user, i) => (
                    <TableRow
                        key={i}
                        className={`${i === 0 ? "bg-yellow-400 hover:bg-yellow-400 p-12 font-semibold dark:text-black" : ""} 
              `}
                    >
                        <TableCell className={`${i === 0 ? "font-semibold" : "font-medium"}`}>
                            <div className="relative inline-block">
                                <Badge
                                    size={36}
                                    className={`${i === 0 ? "text-yellow-500" : "text-gray-400"}`}
                                    fill={i === 0 ? "#facc15" : "none"}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                    {i + 1}.
                                </span>
                            </div>
                        </TableCell>

                        <TableCell>
                            <Link
                                className="flex items-center justify-start gap-2"
                                href={user?.html_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Avatar className="size-12">
                                    <AvatarImage src={user.avatar_url} />
                                    <AvatarFallback>
                                        <User />
                                    </AvatarFallback>
                                </Avatar>
                                <span>{user.login}</span>
                            </Link>
                        </TableCell>
                        <TableCell>{user.score}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    );
}
