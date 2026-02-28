'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useGetJobsQuery } from '@/store/services/api';

export default function FeaturedJobsSection() {
    const { data: jobsData } = useGetJobsQuery();
    const jobs = Array.isArray(jobsData)
        ? jobsData
        : Array.isArray(jobsData?.data)
            ? jobsData.data
            : [];

    const featuredJobs = jobs.slice(0, 8).map((job) => ({
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.jobType || 'Full-time',
        tags: [job.category || 'General'],
        logo: job.company?.charAt(0)?.toUpperCase() || 'Q',
        logoColor: 'bg-[#4640DE]',
    }));

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredJobs.map((job) => (
                        <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${job.logoColor} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                                    {job.logo}
                                </div>
                                <span className="text-xs px-3 py-1 bg-primary-50 text-primary-600 rounded-full border border-primary-100">
                                    {job.type}
                                </span>
                            </div>

                            <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition">
                                {job.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {job.company} • {job.location}
                            </p>

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
