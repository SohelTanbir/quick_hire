'use client';

import Link from 'next/link';
import { FiCode, FiTrendingUp, FiEdit, FiDollarSign, FiMusic, FiDatabase, FiShield, FiHeart, FiArrowRight } from 'react-icons/fi';

export default function CategoriesSection() {
    const categories = [
        {
            icon: FiCode,
            name: 'Development',
            openPositions: 312,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
        },
        {
            icon: FiTrendingUp,
            name: 'Marketing',
            openPositions: 178,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
        },
        {
            icon: FiEdit,
            name: 'Design',
            openPositions: 156,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
        },
        {
            icon: FiDollarSign,
            name: 'Finance',
            openPositions: 89,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
        },
        {
            icon: FiMusic,
            name: 'Music & Audio',
            openPositions: 67,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
        },
        {
            icon: FiDatabase,
            name: 'Data Science',
            openPositions: 145,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
        },
        {
            icon: FiShield,
            name: 'Security',
            openPositions: 92,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
        },
        {
            icon: FiHeart,
            name: 'Healthcare',
            openPositions: 124,
            color: 'text-teal-600',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-200',
        },
    ];

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
                {categories.map((category, index) => {
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
                                {category.openPositions} Open positions
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
