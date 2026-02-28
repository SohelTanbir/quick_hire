'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import {
    useDeleteJobMutation,
    useGetApplicationsQuery,
    useGetJobsQuery,
    useUpdateApplicationStatusMutation,
} from '@/store/services/api';
import { FiFileText, FiUsers, FiTrendingUp, FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const { data: jobsResponse, isLoading: jobsLoading } = useGetJobsQuery();
    const { data: applicationsResponse, isLoading: applicationsLoading } = useGetApplicationsQuery();
    const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();
    const [updateApplicationStatus, { isLoading: isUpdatingStatus }] = useUpdateApplicationStatusMutation();

    const jobs = Array.isArray(jobsResponse?.data) ? jobsResponse.data : [];
    const applications = Array.isArray(applicationsResponse?.data) ? applicationsResponse.data : [];

    const applicationsByJob = applications.reduce((acc, app) => {
        const key = app.jobId?._id || app.jobId;
        if (!key) return acc;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const statusCounts = applications.reduce(
        (acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        },
        { Pending: 0, Reviewed: 0, Accepted: 0, Rejected: 0 }
    );

    const stats = [
        { label: 'Active Jobs', value: jobs.length, icon: FiFileText, color: 'bg-blue-50 text-blue-600' },
        { label: 'Total Applications', value: applications.length, icon: FiUsers, color: 'bg-green-50 text-green-600' },
        { label: 'Pending Reviews', value: statusCounts.Pending, icon: FiEye, color: 'bg-purple-50 text-purple-600' },
        {
            label: 'Accepted Candidates',
            value: statusCounts.Accepted,
            icon: FiTrendingUp,
            color: 'bg-orange-50 text-orange-600',
        },
    ];

    const recentJobs = [...jobs].slice(0, 5);
    const recentApplications = [...applications].slice(0, 8);

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job listing?')) {
            return;
        }

        try {
            await deleteJob(id).unwrap();
        } catch (error) {
            console.error('Failed to delete job', error);
            window.alert('Failed to delete job. Please try again.');
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await updateApplicationStatus({ id, status }).unwrap();
        } catch (error) {
            console.error('Failed to update application status', error);
            window.alert('Failed to update status. Please try again.');
        }
    };

    const loading = jobsLoading || applicationsLoading;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100 pt-20 pb-20">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-clash text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                                <p className="text-gray-600">Welcome back! Here's your job posting overview.</p>
                            </div>
                            <Link
                                href="/admin/jobs/new"
                                className="flex items-center gap-2 px-6 py-3 bg-[#4640DE] text-white rounded-lg hover:bg-[#3B35C8] transition-colors font-medium"
                            >
                                <FiPlus size={20} />
                                Post New Job
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                                        <Icon size={24} />
                                    </div>
                                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                    <p className="font-clash text-3xl font-bold text-gray-900">{loading ? '-' : stat.value}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'overview'
                                ? 'text-primary-600 border-primary-600'
                                : 'text-gray-600 border-transparent hover:text-gray-900'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'jobs'
                                ? 'text-primary-600 border-primary-600'
                                : 'text-gray-600 border-transparent hover:text-gray-900'
                                }`}
                        >
                            My Jobs
                        </button>
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'applications'
                                ? 'text-primary-600 border-primary-600'
                                : 'text-gray-600 border-transparent hover:text-gray-900'
                                }`}
                        >
                            Applications
                        </button>
                    </div>

                    {/* Content */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Jobs */}
                            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                                <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Recent Job Postings</h2>
                                <div className="space-y-4">
                                    {loading ? (
                                        <p className="text-sm text-gray-500">Loading jobs...</p>
                                    ) : recentJobs.length === 0 ? (
                                        <p className="text-sm text-gray-500">No jobs posted yet.</p>
                                    ) : (
                                        recentJobs.map((job) => (
                                            <div key={job._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{job.company} · {job.location}</p>
                                                    <div className="flex gap-4 text-xs text-gray-600">
                                                        <span>{applicationsByJob[job._id] || 0} applications</span>
                                                        <span>{job.jobType}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                                        Active
                                                    </span>
                                                    <button
                                                        onClick={() => router.push(`/admin/jobs/${job._id}`)}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                                                    >
                                                        <FiEdit2 className="text-gray-600" size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id)}
                                                        disabled={isDeleting}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                                                    >
                                                        <FiTrash2 className="text-gray-600" size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        )))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                                <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Quick Stats</h2>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">85%</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Job Response Rate</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{
                                                    width: `${applications.length ? Math.min(100, Math.round((statusCounts.Reviewed + statusCounts.Accepted) / applications.length * 100)) : 0}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {applications.length
                                                ? `${Math.round((statusCounts.Reviewed + statusCounts.Accepted) / applications.length * 100)}%`
                                                : '0%'}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 mb-2">Member Since</p>
                                        <p className="font-semibold text-gray-900">January 2024</p>
                                    </div>
                                    <Link
                                        href="/admin/profile"
                                        className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'jobs' && (
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Your Job Postings</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Job Title</th>
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Applications</th>
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Job Type</th>
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Status</th>
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="py-6 text-sm text-gray-500">Loading job listings...</td>
                                            </tr>
                                        ) : jobs.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-6 text-sm text-gray-500">No jobs available.</td>
                                            </tr>
                                        ) : jobs.map((job) => (
                                            <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                                <td className="py-4 text-gray-900 font-medium">{job.title}</td>
                                                <td className="py-4 text-gray-600">{applicationsByJob[job._id] || 0}</td>
                                                <td className="py-4 text-gray-600">{job.jobType}</td>
                                                <td className="py-4">
                                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="py-4 flex gap-2">
                                                    <button
                                                        onClick={() => router.push(`/admin/jobs/${job._id}`)}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                                                    >
                                                        <FiEdit2 className="text-gray-600" size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id)}
                                                        disabled={isDeleting}
                                                        className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                                                    >
                                                        <FiTrash2 className="text-gray-600" size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Recent Applications</h2>
                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-sm text-gray-500">Loading applications...</p>
                                ) : recentApplications.length === 0 ? (
                                    <p className="text-sm text-gray-500">No applications found.</p>
                                ) : recentApplications.map((app) => (
                                    <div
                                        key={app._id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{app.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{app.jobId?.title || 'Unknown Role'}</p>
                                            <p className="text-xs text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${app.status === 'Pending'
                                                    ? 'bg-yellow-50 text-yellow-700'
                                                    : app.status === 'Reviewed'
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : app.status === 'Accepted'
                                                            ? 'bg-green-50 text-green-700'
                                                            : 'bg-red-50 text-red-700'
                                                    }`}
                                            >
                                                {app.status}
                                            </span>
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                disabled={isUpdatingStatus}
                                                className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg text-sm"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Reviewed">Reviewed</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
