'use client';

import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchValue('');
        onSearch('');
    };

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <FiSearch size={20} />
            </div>
            <input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
                value={searchValue}
                onChange={handleChange}
                className="w-full pl-12 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   font-inter placeholder-gray-500 dark:placeholder-gray-400
                   transition-colors duration-200 shadow-sm hover:shadow-md"
            />
            {searchValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    aria-label="Clear search"
                >
                    <FiX size={20} />
                </button>
            )}
        </div>
    );
}
