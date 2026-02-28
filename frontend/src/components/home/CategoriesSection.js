'use client';

import Link from 'next/link';
import { FiCode, FiTrendingUp, FiEdit, FiDollarSign, FiMusic, FiDatabase, FiShield, FiHeart, FiArrowRight, FiUsers } from 'react-icons/fi';
import { useGetJobsQuery } from '@/store/services/api';
import { useMemo } from 'react';

export default function CategoriesSection() {
    const { data: jobsData } = useGetJobsQuery();
    const jobs = Array.isArray(jobsData)
        ? jobsData
        : Array.isArray(jobsData?.data)
            ? jobsData.data
            : [];

    // Category icon and color mapping
    const categoryStyles = {
        'Development': {
            icon: FiCode,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
        },
        'Marketing': {
            icon: FiTrendingUp,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
        },
        'Design': {
            icon: FiEdit,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
        },
        'Finance': {
            icon: FiDollarSign,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
        },
        'Data Science': {
            icon: FiDatabase,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
        },
        'HR': {
            icon: FiUsers,
            color: 'text-teal-600',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-200',
        },
        'Security': {
            icon: FiShield,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
        },
        'Healthcare': {
            icon: FiHeart,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
        },
    };

    // Calculate job counts per category dynamically
    const categories = useMemo(() => {
        const categoryCounts = {};

        jobs.forEach(job => {
            const category = job.category || 'Other';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        return Object.entries(categoryCounts).map(([name, count]) => ({
            name,
            openPositions: count,
            ...(categoryStyles[name] || {
                icon: FiCode,
                color: 'text-gray-600',
                bgColor: 'bg-gray-50',
                borderColor: 'border-gray-200',
            }),
        }));
    }, [jobs]);

    return (
        <section>
            <div className="flex items-center justify-between mb-12">
                <h2 className="font-clash text-4xl font-bold text-gray-900">
                    Explore by <span className="text-primary-600">category</span>
                </h2>
                <Link
                    href="/jobs"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
                >
                    Show all jobs
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {categories.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No job categories available at the moment.</p>
                    </div>
                ) : (
                    categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={index}
                                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                                className={`bg-white rounded-xl p-6 border ${category.borderColor} hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className={category.color} size={24} />
                                </div>
                                <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-2">
                                    {category.name}
                                </h3>
                                <p className="font-inter text-sm text-gray-600">
                                    {category.openPositions} Open {category.openPositions === 1 ? 'position' : 'positions'}
                                </p>
                            </Link>
                        );
                    })
                )}
            </div>
        </section>
    );
}
