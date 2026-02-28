'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 relative z-50">
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
                        className="px-6 py-2 bg-[#4640DE] hover:bg-primary-700 text-white transition font-epilogue font-bold text-base leading-[160%]"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-600 hover:text-primary-500 transition p-2 relative z-50"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Mobile Navigation Offcanvas */}
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Offcanvas Menu */}
                <div
                    className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full pt-20 px-6 pb-6">
                        {/* Navigation Links */}
                        <div className="flex flex-col gap-1 mb-8">
                            <Link
                                href="/jobs"
                                className="text-gray-700 hover:text-white hover:bg-primary-600 transition-all font-inter font-medium py-3 px-4 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Find Jobs
                            </Link>
                            <Link
                                href="/companies"
                                className="text-gray-700 hover:text-white hover:bg-primary-600 transition-all font-inter font-medium py-3 px-4 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Browse Companies
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-200">
                            <Link
                                href="/login"
                                className="px-6 py-3 text-center border border-primary-600 text-primary-600 hover:bg-primary-50 transition font-inter font-medium rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="px-6 py-3 text-center bg-[#4640DE] hover:bg-primary-700 text-white transition font-epilogue font-bold text-base leading-[160%]"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
