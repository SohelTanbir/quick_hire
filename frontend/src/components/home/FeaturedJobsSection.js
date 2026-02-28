'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useGetJobsQuery } from '@/store/services/api';

// Skeleton loading component
function JobCardSkeleton() {
    return (
        <div className="bg-white p-6 border border-[#D6DDEB] animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-300"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-3 mb-4">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="flex gap-2">
                <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
}

// Category color mapping - rounded pill badges with exact hex colors
const categoryColors = {
    'Marketing': { bg: '#EB85331A', text: '#FFB836' },
    'Design': { bg: '#56CDAD1A', text: '#56CDAD' },
    'Business': { bg: '#4640DE1A', text: '#4640DE' },
    'Technology': { bg: '#EB85331A', text: '#FFB836' }, // Orange like Marketing
    'Sales': { bg: '#EB85331A', text: '#FFB836' },
    'Finance': { bg: '#4640DE1A', text: '#4640DE' }, // Purple like Business
    'Engineering': { bg: '#4640DE1A', text: '#4640DE' },
    'Human Resources': { bg: '#56CDAD1A', text: '#56CDAD' },
};

// Helper function to get random company logo
const getCompanyLogo = (index) => {
    const logoNumber = (index % 5) + 1; // Cycle through 1-5
    return `/assets/images/companies/${logoNumber}.png`;
};

export default function FeaturedJobsSection() {
    const { data: jobsData, isLoading } = useGetJobsQuery();
    const jobs = Array.isArray(jobsData)
        ? jobsData
        : Array.isArray(jobsData?.data)
            ? jobsData.data
            : [];

    const featuredJobs = jobs.slice(0, 8);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between mb-12">
                    <h2 className="font-clash text-4xl font-bold text-[#25324B]">
                        Featured <span className="text-[#4640DE]">jobs</span>
                    </h2>
                    <Link
                        href="/jobs"
                        className="flex items-center gap-2 text-[#4640DE] hover:text-primary-700 font-epilogue font-semibold text-base group"
                    >
                        Show all jobs
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden mb-8">
                    <h2 className="font-clash text-[32px] font-semibold text-[#25324B] mb-6">
                        Featured <span className="text-[#4640DE]">jobs</span>
                    </h2>
                </div>

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
                    {isLoading ? (
                        <>
                            {[...Array(8)].map((_, index) => (
                                <JobCardSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        featuredJobs.map((job, index) => {
                            const categoryStyle = categoryColors[job.category] || { bg: '#E5E7EB1A', text: '#6B7280' };
                            const logoSrc = getCompanyLogo(index);

                            return (
                                <Link
                                    key={job._id}
                                    href={`/jobs/${job._id}`}
                                    className="bg-white p-6 border border-[#D6DDEB] hover:shadow-lg transition-all duration-300 group"
                                >
                                    {/* Header: Logo and Job Type Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 flex items-center justify-center">
                                            <Image
                                                src={logoSrc}
                                                alt={job.company}
                                                width={48}
                                                height={48}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-sm px-4 py-1.5 border border-[#4640DE] text-[#4640DE] font-epilogue font-normal">
                                            {job.jobType || 'Full Time'}
                                        </span>
                                    </div>

                                    {/* Job Title */}
                                    <h3 className="font-clash font-semibold text-xl text-[#25324B] mb-2 group-hover:text-[#4640DE] transition-colors">
                                        {job.title}
                                    </h3>

                                    {/* Company and Location */}
                                    <p className="font-epilogue text-base text-[#7C8493] mb-4">
                                        {job.company} • {job.location}
                                    </p>

                                    {/* Description - truncated to 2 lines */}
                                    <p className="font-epilogue text-base text-[#7C8493] mb-4 line-clamp-2">
                                        {job.description}
                                    </p>

                                    {/* Category Tags - Rounded Pill Badges */}
                                    <div className="flex flex-wrap gap-2">
                                        <span
                                            className="text-sm px-4 py-1.5 rounded-full font-epilogue font-semibold"
                                            style={{
                                                backgroundColor: categoryStyle.bg,
                                                color: categoryStyle.text
                                            }}
                                        >
                                            {job.category}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>

                {/* Mobile Show All Jobs Link */}
                <div className="md:hidden">
                    <Link
                        href="/jobs"
                        className="flex items-center gap-2 text-[#4640DE] hover:text-primary-700 font-epilogue font-semibold text-base group"
                    >
                        Show all jobs
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
