'use client';

import JobCard from './JobCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function JobList({ jobs, loading }) {
    if (loading) {
        return <LoadingSkeleton count={6} type="card" />;
    }

    if (!jobs || jobs.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 font-inter">No jobs found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
}
