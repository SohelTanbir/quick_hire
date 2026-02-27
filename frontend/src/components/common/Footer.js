'use client';

import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 w-fit">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-clash font-bold text-lg">Q</span>
                            </div>
                            <span className="font-clash font-bold text-lg">QuickHire</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Discover and apply to your next opportunity with ease.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                        <h4 className="font-epilogue font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <Link href="/" className="hover:text-primary-400 transition">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin" className="hover:text-primary-400 transition">
                                    Admin Panel
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-400 transition"
                                >
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3">
                        <h4 className="font-epilogue font-semibold text-white">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition"
                                aria-label="GitHub"
                            >
                                <FiGithub size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition"
                                aria-label="Twitter"
                            >
                                <FiTwitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} QuickHire. All rights reserved.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0 text-gray-400 text-sm">
                            <a href="#" className="hover:text-primary-400 transition">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-primary-400 transition">
                                Terms of Service
                            </a>
                            <a href="#" className="hover:text-primary-400 transition">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
