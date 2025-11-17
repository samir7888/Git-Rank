"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { UserTable } from "./user-table";
import { Skeleton } from "./ui/skeleton";

export const NameComponent: React.FC = () => {
    const [name, setName] = React.useState("");
    const timerRef = useRef<number | null>(null);


    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (location: string, p = 1) => {
        setLoading(true);
        const res = await fetch(`/api/users?location=${location}&page=${p}`);
        const data = await res.json();
        setUsers(data.users || []);
        setLoading(false);
    };

    // when page changes (via pagination buttons), refetch for the current name
    useEffect(() => {
        if (name) {
            fetchUsers(name, page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setName(v);
        setPage(1);
        // debounce updates to the URL
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
            fetchUsers(v, 1);
        }, 300);
    };

    return (
        <div className="w-full mx-auto flex flex-col justify-center">
            <div className="my-24  md:w-xl mx-auto">

                <Input
                    type="text"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter location"
                    className="border px-4 py-2 rounded flex flex-1 w-full"
                />
            </div>

            {loading && <Skeleton className="w-full h-14" />}



            {users.length > 0 && (
                <UserTable
                    data={users}
                    tableHeader={["Rank", "Username", "Score"]}
                    onNext={() => setPage(p => p + 1)}
                    loading={loading}
                />
            )}
        </div>
    );
};