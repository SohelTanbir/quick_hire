'use client';

import Link from 'next/link';
import Image from 'next/image';

// Category color mapping - same as Featured Jobs
const categoryColors = {
    'Marketing': { bg: '#EB85331A', text: '#FFB836' },
    'Design': { bg: '#56CDAD1A', text: '#56CDAD' },
    'Business': { bg: '#4640DE1A', text: '#4640DE' },
    'Technology': { bg: '#EB85331A', text: '#FFB836' },
    'Sales': { bg: '#EB85331A', text: '#FFB836' },
    'Finance': { bg: '#4640DE1A', text: '#4640DE' },
    'Engineering': { bg: '#4640DE1A', text: '#4640DE' },
    'Human Resources': { bg: '#56CDAD1A', text: '#56CDAD' },
};

// Helper function to get company logo
const getCompanyLogo = (index) => {
    const logoNumber = (index % 5) + 1;
    return `/assets/images/companies/${logoNumber}.png`;
};

export default function JobCard({ job, index = 0 }) {
    const categoryStyle = categoryColors[job.category] || { bg: '#E5E7EB1A', text: '#6B7280' };
    const logoSrc = getCompanyLogo(index);

    return (
        <Link href={`/jobs/${job._id}`} className="block">
            <div className="bg-white border border-[#D6DDEB] p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="shrink-0 w-16 h-16 flex items-center justify-center">
                        <Image
                            src={logoSrc}
                            alt={job.company}
                            width={64}
                            height={64}
                            className="object-contain"
                        />
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                        {/* Job Title */}
                        <h3 className="font-clash font-semibold text-xl text-[#25324B] mb-2 group-hover:text-[#4640DE] transition-colors">
                            {job.title}
                        </h3>

                        {/* Company and Location */}
                        <p className="font-epilogue text-base text-[#7C8493] mb-4">
                            {job.company} • {job.location}
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {/* Full-Time Badge */}
                            <span
                                className="text-sm px-4 py-1.5 rounded-full font-epilogue font-semibold"
                                style={{
                                    backgroundColor: '#56CDAD1A',
                                    color: '#56CDAD'
                                }}
                            >
                                {job.jobType || 'Full-Time'}
                            </span>

                            {/* Category Badge */}
                            <span
                                className="text-sm px-4 py-1.5 rounded-full font-epilogue font-semibold"
                                style={{
                                    backgroundColor: categoryStyle.bg,
                                    color: categoryStyle.text
                                }}
                            >
                                {job.category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
