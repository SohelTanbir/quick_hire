'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-clash font-bold text-lg">Q</span>
          </div>
          <span className="font-clash font-bold text-xl text-gray-900 dark:text-white hidden sm:inline">
            QuickHire
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-inter"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-inter"
          >
            Admin
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-inter"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary-500 transition p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-inter block py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/admin"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-inter block py-2"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-inter block py-2"
                onClick={() => setIsOpen(false)}
              >
                GitHub
              </a>
            </div>
          </div>
        )}
            </nav>
        </header>
    );
}
