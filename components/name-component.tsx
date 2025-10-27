"use client";

import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { UserTable } from "./user-table";

export const NameComponent: React.FC = () => {
    const [name, setName] = React.useState("");
    const timerRef = useRef<number | null>(null);


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (location: string) => {
        setLoading(true);
        const res = await fetch(`/api/users?location=${location}`);
        const data = await res.json();
        setUsers(data.users || []);
        setLoading(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setName(v);

        // debounce updates to the URL
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
            fetchUsers(v);
        }, 300);
    };

    return (
        <div className="w-3xl mx-auto flex flex-col justify-center">
            <div className="my-24 mx-auto">

                <Input
                    type="text"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter location"
                    className="border px-4 py-2 rounded flex flex-1 w-64"
                />
            </div>

            {loading && <p className="ml-4">Loading...</p>}



            {users.length > 0 && (
                <UserTable data={users} tableHeader={["Rank", "Username", "Score"]} />

            )}
        </div>
    );
};