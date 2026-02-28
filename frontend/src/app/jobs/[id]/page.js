'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetJobsQuery } from '@/store/services/api';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import JobCard from '@/components/jobs/JobCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { FiArrowLeft, FiMapPin, FiClock, FiDollarSign, FiBookmark, FiShare2, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    // Fetch all jobs to find the specific one
    const { data: jobsData, isLoading, error } = useGetJobsQuery();
    const jobs = Array.isArray(jobsData)
        ? jobsData
        : Array.isArray(jobsData?.data)
            ? jobsData.data
            : [];
    const numericId = Number.parseInt(jobId, 10);
    const jobByObjectId = jobs.find((j) => j._id === jobId);
    const jobByLegacyNumericId = jobs.find((j) => j.id === numericId);
    const jobByPosition = Number.isInteger(numericId) && numericId > 0 ? jobs[numericId - 1] : null;
    const job = jobByObjectId || jobByLegacyNumericId || jobByPosition;

    // Mock related jobs (same category)
    const relatedJobs = jobs
        .filter((j) => j.category === job?.category && j._id !== job?._id)
        .slice(0, 3);

    if (isLoading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white pt-20 pb-20">
                    <div className="container mx-auto px-4">
                        <LoadingSkeleton />
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!job) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white pt-20 pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-clash text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                        <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
                        <Link href="/" className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-20 pb-20">
                <div className="container mx-auto px-4">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to jobs
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Job Header */}
                            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
                                <div className="flex items-start justify-between gap-6 mb-6">
                                    {/* Logo & Title */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
                                                <span className="text-3xl font-bold bg-linear-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent">
                                                    {job.company?.charAt(0) || 'C'}
                                                </span>
                                            </div>
                                            <div>
                                                <h1 className="font-clash text-4xl font-bold text-gray-900 mb-2">
                                                    {job.title}
                                                </h1>
                                                <p className="text-gray-600 text-lg">{job.company}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bookmark Button */}
                                    <button
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`p-3 rounded-lg transition ${isBookmarked
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        aria-label="Bookmark job"
                                    >
                                        <FiBookmark size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
                                    </button>
                                </div>

                                {/* Job Meta Info */}
                                <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <FiMapPin className="text-primary-600" size={20} />
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase">Location</p>
                                            <p className="font-semibold text-gray-900">{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-primary-600" size={20} />
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase">Job Type</p>
                                            <p className="font-semibold text-gray-900">{job.jobType}</p>
                                        </div>
                                    </div>
                                    {job.salary && (
                                        <div className="flex items-center gap-2">
                                            <FiDollarSign className="text-primary-600" size={20} />
                                            <div>
                                                <p className="text-xs text-gray-600 uppercase">Salary</p>
                                                <p className="font-semibold text-gray-900">{job.salary}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
                                <h2 className="font-clash text-2xl font-bold text-gray-900 mb-4">About this job</h2>
                                <div className="prose prose-sm max-w-none text-gray-700">
                                    <p className="leading-relaxed mb-6">{job.description}</p>
                                </div>

                                {/* Key Responsibilities */}
                                {job.responsibilities && job.responsibilities.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-4">Key Responsibilities</h3>
                                        <ul className="space-y-3">
                                            {job.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <FiCheck className="text-primary-600 mt-1 shrink-0" size={20} />
                                                    <span className="text-gray-700">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Requirements */}
                                {job.requirements && job.requirements.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-4">Requirements</h3>
                                        <ul className="space-y-3">
                                            {job.requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <FiCheck className="text-primary-600 mt-1 shrink-0" size={20} />
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* About Company */}
                            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
                                <h2 className="font-clash text-2xl font-bold text-gray-900 mb-4">About {job.company}</h2>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {job.companyDescription || `${job.company} is a leading organization in the ${job.category} industry.`}
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        Visit Company Website →
                                    </a>
                                </div>
                            </div>

                            {/* Related Jobs */}
                            {relatedJobs.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="font-clash text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
                                    <div className="space-y-4">
                                        {relatedJobs.map((relatedJob) => (
                                            <JobCard key={relatedJob._id || relatedJob.id} job={relatedJob} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Apply Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-8 sticky top-24 mb-6">
                                {hasApplied ? (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiCheck size={32} />
                                        </div>
                                        <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-2">Applied!</h3>
                                        <p className="text-gray-600 text-sm mb-6">
                                            We'll notify you when the employer reviews your application.
                                        </p>
                                        <button className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                            View Application
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <Link
                                            href={`/apply?jobId=${job._id}&jobTitle=${encodeURIComponent(job.title)}`}
                                            className="block w-full px-8 py-3 bg-[#4640DE] hover:bg-primary-700 text-white rounded-lg transition-colors font-epilogue font-bold text-base leading-[160%] text-center mb-4"
                                        >
                                            Apply Now
                                        </Link>
                                        <p className="text-xs text-gray-500 text-center">
                                            By clicking apply, you agree to our terms and conditions
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Share Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-8">
                                <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-4">Share this job</h3>
                                <div className="flex gap-3">
                                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                        Twitter
                                    </button>
                                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                        LinkedIn
                                    </button>
                                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                        Email
                                    </button>
                                </div>
                            </div>

                            {/* Job Stats */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mt-6">
                                <h3 className="font-epilogue font-semibold text-lg text-gray-900 mb-4">Job Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase">Category</p>
                                        <p className="font-semibold text-gray-900">{job.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase">Posted</p>
                                        <p className="font-semibold text-gray-900">{job.postedDate || '2 days ago'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 uppercase">Applicants</p>
                                        <p className="font-semibold text-gray-900">{job.applicants || '12'} applied</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
