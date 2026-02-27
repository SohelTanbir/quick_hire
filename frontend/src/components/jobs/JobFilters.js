'use client';

import { CATEGORIES, LOCATIONS } from '@/constants';
import { FiChevronDown } from 'react-icons/fi';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function JobFilters({ onFilterChange }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-epilogue font-semibold text-gray-900 dark:text-white mb-6">
                Filters
            </h3>

            <div className="space-y-6">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Category
                    </label>
                    <select
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-primary-500
                       font-inter text-sm appearance-none cursor-pointer transition-colors"
                    >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Location Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Location
                    </label>
                    <select
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-primary-500
                       font-inter text-sm appearance-none cursor-pointer transition-colors"
                    >
                        <option value="">All Locations</option>
                        {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Job Type Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Job Type
                    </label>
                    <select
                        onChange={(e) => onFilterChange('jobType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-primary-500
                       font-inter text-sm appearance-none cursor-pointer transition-colors"
                    >
                        <option value="">All Types</option>
                        {JOB_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Filter Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                    💡 Use filters to narrow down your job search and find the perfect fit.
                </p>
            </div>
        </div>
    );
}
