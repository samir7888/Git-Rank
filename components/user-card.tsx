import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from 'lucide-react'
import { UserType } from '@/types/users-type'
import Link from 'next/link'

export const UserCard = ({ user }: { user: UserType }) => {
    return (
        <li key={user.login} className="p-4 flex items-center gap-4 border rounded hover:shadow">
            <Avatar className="size-12">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
            </Avatar>
            <Link
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium text-blue-600 hover:underline"
            >
                {user.login}
            </Link>
        </li>
    )
}

