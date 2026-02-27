'use client';

import { FiBriefcase, FiUsers, FiHome, FiCheckCircle } from 'react-icons/fi';

export default function StatsSection() {
    const stats = [
        {
            icon: FiBriefcase,
            number: '1,75,324',
            label: 'Live Job',
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/30',
        },
        {
            icon: FiHome,
            number: '97,354',
            label: 'Companies',
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/30',
        },
        {
            icon: FiUsers,
            number: '38,47,154',
            label: 'Candidates',
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-900/30',
        },
        {
            icon: FiCheckCircle,
            number: '7,532',
            label: 'New Jobs',
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-900/30',
        },
    ];

    return (
        <section className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 text-center"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${stat.bgColor} mb-4`}>
                                <Icon className={stat.color} size={28} />
                            </div>
                            <h3 className="font-clash text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.number}
                            </h3>
                            <p className="font-inter text-gray-600 dark:text-gray-400 text-sm">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
