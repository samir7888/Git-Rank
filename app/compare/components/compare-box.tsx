"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import img from '../../../public/github-username.png'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { GitHubUser } from '@/types/users-type'
import Link from 'next/link'


interface Props {
    setIsSelectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    side: React.Dispatch<React.SetStateAction<"LEFT" | "RIGHT">>;


    user1: GitHubUser | null;
    user2: GitHubUser | null;
}

const CompareBox = ({ setIsSelectModalOpen, side, user1, user2 }: Props) => {



    return (
        <div className='flex h-[300px] bg-blue-50 dark:bg-neutral-800 rounded-2xl'>
            <div className='relative flex flex-col items-center'>

                {user1 ? (


                    <Link href={user1?.html_url} >

                        <Image src={user1?.avatar_url} alt='user-1' width={200} height={300} className='object-cover h-64 p-6 rounded-2xl' />
                    </Link>
                ) : (
                    <Image src={img} alt='user-1' width={200} height={300} className='object-cover h-64 p-6 rounded-2xl' />
                )}







                {!user1 && <span className='z-10 absolute inset-0 flex items-center justify-center '><Plus className='size-18 text-neutral-500' /></span>}
                <Button onClick={() => {
                    setIsSelectModalOpen(true);
                    side("LEFT")

                }} className='z-20'>Select</Button>
            </div>



            <div className='flex flex-col justify-around'>
                <h2 className='font-semibold text-2xl'>Select username to compare</h2>
                <div className='space-y-3'>
                    <div className='h-8 flex flex-1 rounded-2xl px-2 justify-between items-center bg-neutral-100 dark:bg-neutral-700'>
                        <span>{user1?.followers || '-'}</span>
                        <span>No. of Followers</span>
                        <span>{user2?.followers || '-'}</span>
                    </div>
                    <div className='h-8 flex flex-1 px-2 rounded-2xl justify-between items-center bg-neutral-200 dark:bg-neutral-900'>
                        <span>{user1?.public_repos || '-'}</span>
                        <span>No. of Public Repos</span>
                        <span>{user2?.public_repos || '-'}</span>
                    </div>
                    <div className='h-8 flex flex-1 px-2 rounded-2xl justify-between items-center bg-neutral-100 dark:bg-neutral-700'>
                        <span><span>{user1?.public_gists || '-'}</span></span>
                        <span>No. of Gists</span>
                        <span><span>{user2?.public_gists || '-'}</span></span>
                    </div>

                </div>
            </div>



            <div className='relative flex flex-col items-center'>
                {user2 ? (


                    <Link href={user2?.html_url} >

                        <Image src={user2?.avatar_url} alt='user-1' width={200} height={300} className='object-cover h-64 p-6 rounded-2xl' />
                    </Link>
                ) : (
                    <Image src={img} alt='user-1' width={200} height={300} className='object-cover h-64 p-6 rounded-2xl' />
                )}
                {!user2 && <span className='z-10 absolute inset-0 flex items-center justify-center '><Plus className='size-18 text-neutral-500' /></span>}
                <Button onClick={() => {
                    setIsSelectModalOpen(true);
                    side("RIGHT")

                }} className='z-20'>Select</Button>
            </div>

        </div>
    )
}

export default CompareBox