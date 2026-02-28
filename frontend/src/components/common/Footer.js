'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiDribbble } from 'react-icons/fi';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribe email:', email);
        setEmail('');
    };

    return (
        <footer className="bg-[#202430] text-white py-16">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 w-fit">
                            <Image
                                src="/assets/images/logo/Logo%201.png"
                                alt="QuickHire Logo"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                            <span className="font-bold text-xl text-white">QuickHire</span>
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed pr-4">
                            Great platform for the job seeker that searching for new career heights and passionate about startups.
                        </p>
                    </div>

                    {/* About Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-base mb-5">About</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/companies" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href="/advice" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Advice
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-base mb-5">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Help Docs
                                </Link>
                            </li>
                            <li>
                                <Link href="/guide" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Updates
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 text-sm hover:text-primary-400 transition">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white text-base mb-5">Get job notifications</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
                    <p className="text-gray-400 text-sm">
                        2021 © QuickHire. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary-400 transition"
                            aria-label="Facebook"
                        >
                            <FiFacebook size={18} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary-400 transition"
                            aria-label="Instagram"
                        >
                            <FiInstagram size={18} />
                        </a>
                        <a
                            href="https://dribbble.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary-400 transition"
                            aria-label="Dribbble"
                        >
                            <FiDribbble size={18} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary-400 transition"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin size={18} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary-400 transition"
                            aria-label="Twitter"
                        >
                            <FiTwitter size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
