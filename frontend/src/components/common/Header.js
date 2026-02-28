'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/images/logo/Logo%201.png"
                        alt="QuickHire Logo"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                    <span className="font-clash font-bold text-xl text-gray-900">
                        QuickHire
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/jobs"
                        className="text-gray-700 hover:text-primary-600 transition font-inter font-medium"
                    >
                        Find Jobs
                    </Link>
                    <Link
                        href="/companies"
                        className="text-gray-700 hover:text-primary-600 transition font-inter font-medium"
                    >
                        Browse Companies
                    </Link>
                </div>

                {/* Auth Buttons - Desktop */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-6 py-2 text-primary-600 hover:text-primary-700 transition font-inter font-medium"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-6 py-2 bg-[#4640DE] hover:bg-primary-700 text-white rounded-md transition font-epilogue font-bold text-base leading-[160%]"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-600 hover:text-primary-500 transition p-2"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden">
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <Link
                                href="/jobs"
                                className="text-gray-700 hover:text-primary-600 transition font-inter font-medium block py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Find Jobs
                            </Link>
                            <Link
                                href="/companies"
                                className="text-gray-700 hover:text-primary-600 transition font-inter font-medium block py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Browse Companies
                            </Link>
                            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                                <Link
                                    href="/login"
                                    className="px-6 py-2 text-center text-primary-600 hover:text-primary-700 transition font-inter font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-6 py-2 text-center bg-[#4640DE] hover:bg-primary-700 text-white rounded-md transition font-epilogue font-bold text-base leading-[160%]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
