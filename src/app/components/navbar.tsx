'use client'
import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navbar: React.FC = ({}) => {
    const pathname = usePathname();

    return (
        <>
        <nav className="flex gap-4">
          <Link
            className={`${pathname === '/work' ? 'font-bold underline' : 'font-thin'} text-xl`}
            href="/work"
          >
            Work
          </Link>
          <Link
            className={`${pathname === '/about' ? 'font-bold underline' : 'font-thin'} text-xl`}
            href="/about"
          >
            About
          </Link>
        </nav>
        </>
    );
};


export default Navbar;