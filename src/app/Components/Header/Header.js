'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import kalki from "../../../../public/image/kalkiweb.png";
import { TheamContext } from '@/Context/TheamContext';

const Header = () => {
    const { theme, toggleTheme } = useContext(TheamContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const headerItems = [
        { name: 'Home', link: '/' },
        { name: 'Company', link: '/company' },
        { name: 'Marketplace', link: '/marketplace' },
        { name: 'Features', link: '/features' },
        { name: 'Team', link: '/team' },
        { name: 'Contact', link: '/contact' },
        { name: 'Blog', link: '/blog' }
    ];

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header>
            <nav className="  border-gray-200 px-2 lg:px-6 py-2  ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <Link href="/" className="w-[90px]">
                        <Image src={kalki} alt="Logo" className="h-[60px] object-contain" />
                    </Link>

                    <div className="flex items-center lg:order-2">
                        <Link href="/login" className="t dark:text-white hover:border-2 border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 mr-2 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Log in</Link>
                        <button
                        onClick={toggleTheme}
                        className=" hover:border-2 border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 mr-2 "
                    >
                        {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
                    </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center p-2 ml-2 text-sm rounded-lg lg:hidden hover:bg-[#00000089] focus:outline-none focus:ring-2 focus:ring-gray-200  dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                            )}
                        </button>
                    </div>

                   

                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:items-center">
                            {headerItems.map((item, index) => {
                                const isActive = pathname === item.link;
                                return (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0
                      ${isActive
                                                    ? 'text-blue-600 dark:text-white font-semibold'
                                                    : 'dark:text-gray-400'
                                                }
                      hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Header;
