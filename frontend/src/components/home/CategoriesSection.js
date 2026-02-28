'use client';

import Link from 'next/link';
import { FiCode, FiTrendingUp, FiEdit, FiDollarSign, FiArrowRight, FiUsers, FiBriefcase } from 'react-icons/fi';
import { useGetJobsQuery } from '@/store/services/api';
import { useMemo } from 'react';

// Skeleton loading component
function CategorySkeleton() {
    return (
        <div className="w-full h-[214px] flex flex-col justify-between p-8 border border-[#D6DDEB] bg-white animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="space-y-3">
                <div className="h-6 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
        </div>
    );
}

function MobileCategorySkeleton() {
    return (
        <div className="flex items-center gap-4 px-4 py-4 bg-white border-b border-[#D6DDEB] animate-pulse">
            <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>
            <div className="flex-shrink-0 w-5 h-5 bg-gray-300 rounded"></div>
        </div>
    );
}

export default function CategoriesSection() {
    const { data: jobsData, isLoading } = useGetJobsQuery();

    const jobs = Array.isArray(jobsData)
        ? jobsData
        : Array.isArray(jobsData?.data)
            ? jobsData.data
            : [];

    // Fixed category order matching design
    const categoryOrder = [
        'Design',
        'Sales',
        'Marketing',
        'Finance',
        'Technology',
        'Engineering',
        'Business',
        'Human Resources',
    ];

    // Category icon mapping
    const categoryIcons = {
        'Technology': FiCode,
        'Design': FiEdit,
        'Sales': FiTrendingUp,
        'Marketing': FiTrendingUp,
        'Finance': FiDollarSign,
        'Engineering': FiCode,
        'Business': FiBriefcase,
        'Human Resources': FiUsers,
    };

    // Calculate job counts per category dynamically
    const categories = useMemo(() => {
        const categoryCounts = {};

        jobs.forEach(job => {
            const category = job.category || 'Other';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Return categories in fixed order
        return categoryOrder.map(name => ({
            name,
            jobsCount: categoryCounts[name] || 0,
            icon: categoryIcons[name] || FiCode,
        }));
    }, [jobs]);

    return (
        <section className="py-20">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between mb-12">
                <h2 className="font-clash text-4xl font-bold text-[#25324B]">
                    Explore by <span className="text-[#4640DE]">category</span>
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
                <h2 className="font-clash text-[20px] font-semibold text-[#25324B] mb-6">
                    Explore by <span className="text-[#4640DE]">category</span>
                </h2>
            </div>

            {/* Desktop Grid Layout - 4 columns */}
            <div className="hidden md:grid grid-cols-4 gap-8 mb-12">
                {isLoading ? (
                    <>
                        {[...Array(8)].map((_, index) => (
                            <CategorySkeleton key={index} />
                        ))}
                    </>
                ) : (
                    categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={index}
                                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                                className="group transition-all duration-300"
                            >
                                <div className="w-full h-[214px] flex flex-col justify-between p-8 border border-[#D6DDEB] bg-white hover:bg-[#4640DE] transition-all duration-300 cursor-pointer">
                                    {/* Icon */}
                                    <div className="flex items-start">
                                        <Icon className="text-[#4640DE] group-hover:text-white transition-colors" size={32} />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="font-clash font-semibold md:text-2xl text-xl text-[#25324B] group-hover:text-white transition-colors leading-[120%]">
                                            {category.name}
                                        </h3>
                                        <p className="font-epilogue font-normal text-lg text-[#7C8493] group-hover:text-blue-100 transition-colors leading-[160%]">
                                            {category.jobsCount} job{category.jobsCount !== 1 ? 's' : ''} available
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>

            {/* Mobile List Layout - Single Column */}
            <div className="md:hidden space-y-0 mb-8">
                {isLoading ? (
                    <>
                        {[...Array(8)].map((_, index) => (
                            <MobileCategorySkeleton key={index} />
                        ))}
                    </>
                ) : (
                    categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={index}
                                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                                className="flex items-center gap-4 px-4 py-4 bg-white border-b border-[#D6DDEB] hover:bg-primary-50 transition-colors group"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center">
                                    <Icon className="text-[#4640DE]" size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-clash font-semibold text-[20px] text-[#25324B]">
                                        {category.name}
                                    </h3>
                                    <p className="font-epilogue font-normal text-[#7C8493] text-sm">
                                        {category.jobsCount} job{category.jobsCount !== 1 ? 's' : ''} available
                                    </p>
                                </div>
                                <FiArrowRight className="flex-shrink-0 text-[#4640DE] group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                        );
                    })
                )}
            </div>

            {/* Mobile Show All Jobs Link */}
            <div className="md:hidden mb-8">
                <Link
                    href="/jobs"
                    className="flex items-center gap-2 text-[#4640DE] hover:text-primary-700 font-epilogue font-semibold text-base group"
                >
                    Show all jobs
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
            </div>

            {/* Bottom Border */}
            <div className="hidden md:block border-b border-[#D6DDEB] pt-8" />
        </section>
    );
}
