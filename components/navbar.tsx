import React from 'react'
import { ModeToggle } from './toggle-mode'

const Navbar = () => {
    return (
        <div className='fixed z-50 top-6 w-full flex items-center justify-between'>
            <nav className="w-3xl rounded-3xl mx-auto flex items-center justify-between px-6 py-2 bg-white backdrop-blur-md border-b border-white/30 dark:bg-neutral-900/40 shadow-md">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    Gitrank
                </div>
                <div>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    )
}

export default Navbar