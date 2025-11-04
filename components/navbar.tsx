"use client"
import { ModeToggle } from './toggle-mode'
import Link from 'next/link'
import React from 'react'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Compare', href: '/compare' },
]
import { motion } from "motion/react"

const Navbar = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    return (
        <div className='fixed z-50 top-6 w-full flex items-center justify-between'>
            <nav className="w-3xl rounded-3xl mx-auto flex items-center justify-between px-6 py-2 bg-white backdrop-blur-md border-b border-white/30 dark:bg-neutral-900/40 shadow-md">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    Gitrank
                </div>
                <div className='flex items-center justify-between gap-6'>
                    <div className='flex items-center justify-between'>
                        {navLinks.map((link, idx) => (

                            <Link
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                key={link.href}
                                href={link.href}
                                className="relative group  text-gray-600 dark:text-gray-300 px-3 py-2 rounded-2xl hover:text-gray-900 dark:hover:text-white font-medium"
                            >
                                {hoveredIndex === idx && (
                                    <motion.div layoutId='hover' className='absolute rounded-2xl inset-0 bg-neutral-100 w-full h-full'></motion.div>
                                )}
                                <span className=' relative group-hover:text-black'>

                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div>

                        <ModeToggle />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar