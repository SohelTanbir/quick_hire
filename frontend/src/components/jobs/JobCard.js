'use client';

import Link from 'next/link';
import { FiMapPin, FiClock, FiDollarSign, FiBookmark } from 'react-icons/fi';

export default function JobCard({ job }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="shrink-0">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
                        <span className="text-2xl font-bold bg-linear-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent">
                            {job.company?.charAt(0) || 'C'}
                        </span>
                    </div>
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                            <Link href={`/jobs/${job._id}`} className="group/link">
                                <h3 className="font-epilogue font-semibold text-xl text-gray-900 mb-2 group-hover/link:text-primary-600 transition">
                                    {job.title}
                                </h3>
                            </Link>
                            <p className="text-gray-600 font-inter text-base mb-3">
                                {job.company}
                            </p>
                        </div>

                        {/* Bookmark Button */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Bookmark job">
                            <FiBookmark className="text-gray-400" size={20} />
                        </button>
                    </div>

                    {/* Job Details */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <FiMapPin size={16} className="shrink-0" />
                            <span className="text-sm font-inter">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <FiClock size={16} className="shrink-0" />
                            <span className="text-sm font-inter">{job.jobType}</span>
                        </div>
                        {job.salary && (
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <FiDollarSign size={16} className="shrink-0" />
                                <span className="text-sm font-inter">{job.salary}</span>
                            </div>
                        )}
                    </div>

                    {/* Job Description */}
                    <p className="text-gray-700 text-sm font-inter line-clamp-2 mb-4">
                        {job.description}
                    </p>

                    {/* Tags and Apply Button */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-md border border-primary-100">
                                {job.category}
                            </span>
                            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100">
                                {job.jobType}
                            </span>
                        </div>

                        <Link
                            href={`/jobs/${job._id}`}
                            className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
