'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import JobCard from '@/components/jobs/JobCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { useGetJobsQuery } from '@/store/services/api';
import { FiSearch, FiSliders, FiX } from 'react-icons/fi';

function JobsPageContent() {
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const { data: jobsData, isLoading } = useGetJobsQuery();
    const jobs = Array.isArray(jobsData) ? jobsData : Array.isArray(jobsData?.data) ? jobsData.data : [];

    // Extract unique categories and job types from actual jobs
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(jobs.map(job => job.category).filter(Boolean))];
        return uniqueCategories.sort();
    }, [jobs]);

    const jobTypes = useMemo(() => {
        const uniqueTypes = [...new Set(jobs.map(job => job.jobType).filter(Boolean))];
        return uniqueTypes.length > 0 ? uniqueTypes : ['Full time', 'Part time', 'Contract', 'Freelance', 'Internship'];
    }, [jobs]);

    // Read URL parameters on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');
        const locationParam = searchParams.get('location');

        if (categoryParam) {
            setSelectedCategory(categoryParam);
            setShowFilters(true);
        }
        if (searchParam) {
            setSearchQuery(searchParam);
        }
        if (locationParam) {
            setSelectedLocation(locationParam);
            setShowFilters(true);
        }
    }, [searchParams]);

    // Filter jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                !searchQuery ||
                job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = !selectedCategory || job.category?.trim() === selectedCategory.trim();
            const matchesJobType = !selectedJobType || job.jobType?.trim() === selectedJobType.trim();
            const matchesLocation = !selectedLocation || job.location?.toLowerCase().includes(selectedLocation.toLowerCase());

            return matchesSearch && matchesCategory && matchesJobType && matchesLocation;
        });
    }, [jobs, searchQuery, selectedCategory, selectedJobType, selectedLocation]);

    const hasActiveFilters = selectedCategory || selectedJobType || selectedLocation;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100 pt-20 pb-20">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="font-clash text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
                        <p className="text-gray-600">
                            Browse our latest job openings and apply today
                            {hasActiveFilters && (
                                <span className="ml-2 text-primary-600 font-medium">
                                    • Filtering{selectedCategory && ` by ${selectedCategory}`}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Job title, company, or keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                <FiSliders size={20} />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                        </div>

                        {/* Filters */}
                        {showFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Job Type</label>
                                    <select
                                        value={selectedJobType}
                                        onChange={(e) => setSelectedJobType(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                    >
                                        <option value="">All Types</option>
                                        {jobTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                                    <input
                                        type="text"
                                        placeholder="City or region..."
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Active Filters Display */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                                {selectedCategory && (
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full border border-primary-200 text-sm"
                                    >
                                        {selectedCategory}
                                        <FiX size={16} />
                                    </button>
                                )}
                                {selectedJobType && (
                                    <button
                                        onClick={() => setSelectedJobType('')}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full border border-primary-200 text-sm"
                                    >
                                        {selectedJobType}
                                        <FiX size={16} />
                                    </button>
                                )}
                                {selectedLocation && (
                                    <button
                                        onClick={() => setSelectedLocation('')}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full border border-primary-200 text-sm"
                                    >
                                        {selectedLocation}
                                        <FiX size={16} />
                                    </button>
                                )}
                                {hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('');
                                            setSelectedJobType('');
                                            setSelectedLocation('');
                                        }}
                                        className="text-primary-600 hover:text-primary-700 font-medium text-sm ml-2"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Job List */}
                        <div className="lg:col-span-2">
                            {isLoading ? (
                                <LoadingSkeleton />
                            ) : filteredJobs.length > 0 ? (
                                <div className="space-y-4">
                                    <p className="text-gray-600 mb-6">
                                        Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> jobs
                                        {selectedCategory && (
                                            <span className="ml-2 text-sm">
                                                in <strong className="text-primary-600">{selectedCategory}</strong>
                                            </span>
                                        )}
                                    </p>
                                    {filteredJobs.map((job) => (
                                        <JobCard key={job._id || job.id} job={job} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                    <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-2">No jobs found</h3>
                                    <p className="text-gray-600 mb-2">
                                        {selectedCategory || selectedJobType || selectedLocation
                                            ? 'No jobs match your current filters.'
                                            : 'Try adjusting your filters or search query to find more jobs'}
                                    </p>
                                    {hasActiveFilters && (
                                        <div className="text-sm text-gray-500 mb-6">
                                            Active filters:
                                            {selectedCategory && <span className="ml-2 font-medium">Category: {selectedCategory}</span>}
                                            {selectedJobType && <span className="ml-2 font-medium">Type: {selectedJobType}</span>}
                                            {selectedLocation && <span className="ml-2 font-medium">Location: {selectedLocation}</span>}
                                        </div>
                                    )}
                                    {/* Debug info */}
                                    {jobs.length > 0 && selectedCategory && (
                                        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left text-xs">
                                            <p className="font-semibold mb-2">Debug Info:</p>
                                            <p>Total jobs in database: {jobs.length}</p>
                                            <p>Selected category: "{selectedCategory}"</p>
                                            <p className="mt-2">Available categories:</p>
                                            <ul className="list-disc list-inside">
                                                {jobs.map((job, idx) => (
                                                    <li key={idx}>
                                                        {job.title}: "{job.category}"
                                                        {job.category?.trim() === selectedCategory.trim() ? ' ✓ MATCH' : ' ✗ NO MATCH'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('');
                                            setSelectedJobType('');
                                            setSelectedLocation('');
                                            setSearchQuery('');
                                        }}
                                        className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                                <h2 className="font-epilogue font-semibold text-lg text-gray-900 mb-4">Quick Stats</h2>
                                <div className="space-y-4">
                                    <div className="pb-4 border-b border-gray-200">
                                        <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                                        <p className="font-clash text-3xl font-bold text-gray-900">{jobs.length}</p>
                                    </div>
                                    <div className="pb-4 border-b border-gray-200">
                                        <p className="text-sm text-gray-600 mb-1">Matching Results</p>
                                        <p className="font-clash text-3xl font-bold text-primary-600">{filteredJobs.length}</p>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-gray-600 mb-3">Popular Categories</p>
                                        <div className="space-y-2">
                                            {categories.slice(0, 5).map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function JobsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsPageContent />
        </Suspense>
    );
}
