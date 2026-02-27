'use client';

import Link from 'next/link';
import { FiMapPin, FiTag, FiBriefcase, FiArrowRight } from 'react-icons/fi';

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6
                      shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
                      hover:border-primary-300 dark:hover:border-primary-500 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-epilogue font-semibold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-inter text-sm">
              {job.company}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/20">
              <FiBriefcase className="text-primary-600 dark:text-primary-400" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiMapPin size={16} className="flex-shrink-0" />
            <span className="text-sm font-inter">{job.location}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm font-inter line-clamp-2">
            {job.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
              {job.category}
            </span>
            <span className="inline-block px-3 py-1 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full">
              {job.jobType}
            </span>
          </div>
          <FiArrowRight className="text-gray-400 dark:text-gray-600 flex-shrink-0" size={18} />
        </div>
      </div>
    </Link>
    );
}
