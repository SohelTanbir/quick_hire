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
            : Array.isArray(jobsData?.jobs)
                ? jobsData.jobs
                : [];

    const featuredJobs = jobs.slice(0, 8).map((job) => ({
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.jobType || 'Full-time',
        tags: [job.category || 'General'],
        logo: job.company?.charAt(0)?.toUpperCase() || 'Q',
        logoColor: 'bg-blue-600',
    }));

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
import { useGetJobsQuery } from '@/store/services/api';
                        <Link
                            key={job.id}
    const { data: jobsData } = useGetJobsQuery();
    const jobs = Array.isArray(jobsData)
        ? jobsData
        : Array.isArray(jobsData?.data)
            ? jobsData.data
            : Array.isArray(jobsData?.jobs)
                ? jobsData.jobs
                : [];

    const featuredJobs = jobs.slice(0, 8).map((job) => ({
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.jobType || 'Full-time',
        tags: [job.category || 'General'],
        logo: job.company?.charAt(0)?.toUpperCase() || 'Q',
        logoColor: 'bg-primary-600',
    }));
                                {job.company} • {job.location}
