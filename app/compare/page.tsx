"use client"

import React, { useState } from 'react'

import CompareBox from './components/compare-box'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitHubUser } from '@/types/users-type';
import { motion } from 'motion/react'
import MultiSeriesRadar from './components/rador-chart';

const Comare = () => {
    const [username, setUsername] = React.useState<string | null>(null)
    const [isSelectModalOpen, setIsSelectModalOpen] = React.useState(false);
    const [user1, setUser1] = useState<GitHubUser | null>(null);
    const [user2, setUser2] = useState<GitHubUser | null>(null);
    const [selectside, setselectSide] = React.useState<"LEFT" | "RIGHT">("LEFT");


    const handleSelect = async (side: "LEFT" | "RIGHT") => {
        setIsSelectModalOpen(true);
        if (!username) return;

        const res = await fetch(`https://api.github.com/users/${username}`);
        const data: GitHubUser = await res.json();

        if (side === "LEFT") {
            setUser1(data);
        } else {
            setUser2(data);
        }
        setIsSelectModalOpen(false)
    };



    return (
        <div className='flex items-center flex-col space-y-8'>
            <h1 className='text-5xl font-bold mt-40'>Compare Github Users</h1>
            <CompareBox setIsSelectModalOpen={setIsSelectModalOpen} side={setselectSide} user1={user1} user2={user2} />

            {
                user1 && user2 && (
                    <MultiSeriesRadar
                        user1Label={user1.name}
                        user2Label={user2.name}
                        user1Data={[
                            user1.followers || 0,
                            user1.following || 0,
                            user1.public_gists || 0,
                            user1.public_repos || 0,
                        ]}
                        user2Data={[
                            user2.followers || 0,
                            user2.following || 0,
                            user2.public_gists || 0,
                            user2.public_repos || 0,
                        ]}
                    />
                )
            }



            {
                isSelectModalOpen && (
                    <div className='fixed inset-0 bg-black/70  bg-opacity-50 flex items-center justify-center z-50'>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='relative p-6 rounded-2xl space-y-6 dark:bg-neutral-800 bg-neutral-100'>
                            <div className='text-xl text-balance'>Enter username to compare</div>
                            <div className='space-y-4'>
                                <Input onChange={(e) => setUsername(e.target.value)} className='px-3 py-2 bg-neutral-100 dark:bg-neutral-700 dark:text-white text-xl' />
                                <div className='space-x-3'>

                                    <Button onClick={() => setIsSelectModalOpen(false)} variant={'ghost'}>Cancel</Button>
                                    <Button onClick={() => handleSelect(selectside)}>Select</Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )
            }


        </div >
    )
}

export default Comare