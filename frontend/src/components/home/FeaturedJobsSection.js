'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function FeaturedJobsSection() {
    // Mock featured jobs data
    const featuredJobs = [
        {
            id: 1,
            title: 'Email Marketing',
            company: 'Revolut',
            location: 'Madrid, Spain',
            type: 'Full time',
            tags: ['Marketing'],
            logo: 'R',
            logoColor: 'bg-blue-500',
        },
        {
            id: 2,
            title: 'Brand Designer',
            company: 'Dropbox',
            location: 'San Francisco, US',
            type: 'Full time',
            tags: ['Design'],
            logo: 'D',
            logoColor: 'bg-blue-600',
        },
        {
            id: 3,
            title: 'Email Marketing',
            company: 'Pitch',
            location: 'Berlin, Germany',
            type: 'Full time',
            tags: ['Marketing'],
            logo: 'P',
            logoColor: 'bg-gray-900',
        },
        {
            id: 4,
            title: 'Visual Designer',
            company: 'Udacity',
            location: 'Berlin, Germany',
            type: 'Full time',
            tags: ['Design'],
            logo: 'U',
            logoColor: 'bg-teal-500',
        },
        {
            id: 5,
            title: 'Product Designer',
            company: 'ClassPass',
            location: 'Manchester, UK',
            type: 'Full time',
            tags: ['Design'],
            logo: 'C',
            logoColor: 'bg-blue-600',
        },
        {
            id: 6,
            title: 'Lead Designer',
            company: 'Canva',
            location: 'Ontario, Canada',
            type: 'Full time',
            tags: ['Design'],
            logo: 'C',
            logoColor: 'bg-teal-600',
        },
        {
            id: 7,
            title: 'Brand Strategist',
            company: 'GoDaddy',
            location: 'Marseille, France',
            type: 'Full time',
            tags: ['Marketing'],
            logo: 'G',
            logoColor: 'bg-purple-600',
        },
        {
            id: 8,
            title: 'Data Analyst',
            company: 'Twitter',
            location: 'San Diego, US',
            type: 'Full time',
            tags: ['Technology'],
            logo: 'T',
            logoColor: 'bg-blue-400',
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-clash text-4xl font-bold text-gray-900">
                        Featured <span className="text-primary-600">jobs</span>
                    </h2>
                    <Link
                        href="/jobs"
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
                    >
                        Show all jobs
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredJobs.map((job) => (
                        <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                        >
                            {/* Logo & Badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${job.logoColor} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                                    {job.logo}
                                </div>
                                <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                                    {job.type}
                                </span>
                            </div>

                            {/* Job Title */}
                            <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition">
                                {job.title}
                            </h3>

                            {/* Company & Location */}
                            <p className="text-gray-600 text-sm mb-4">
                                {job.company} • {job.location}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1 border border-primary-200 text-primary-700 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
