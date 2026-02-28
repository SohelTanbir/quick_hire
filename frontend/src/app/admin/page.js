'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FiBarChart3, FiFileText, FiUsers, FiTrendingUp, FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const stats = [
        { label: 'Active Jobs', value: '8', icon: FiFileText, color: 'bg-blue-50 text-blue-600' },
        { label: 'Total Applications', value: '142', icon: FiUsers, color: 'bg-green-50 text-green-600' },
        { label: 'Profile Views', value: '3,421', icon: FiEye, color: 'bg-purple-50 text-purple-600' },
        { label: 'Monthly Earnings', value: '$2,450', icon: FiTrendingUp, color: 'bg-orange-50 text-orange-600' },
    ];

    const postedJobs = [
        {
            id: 1,
            title: 'Senior Product Designer',
            company: 'TechCorp',
            applications: 28,
            views: 1250,
            status: 'Active',
            date: '2024-02-15',
        },
        {
            id: 2,
            title: 'Full Stack Developer',
            company: 'StartupX',
            applications: 42,
            views: 2100,
            status: 'Active',
            date: '2024-02-10',
        },
        {
            id: 3,
            title: 'UX Research Lead',
            company: 'DesignHouse',
            applications: 15,
            views: 850,
            status: 'Active',
            date: '2024-02-05',
        },
    ];

    const recentApplications = [
        {
            id: 1,
            candidateName: 'Sarah Johnson',
            jobTitle: 'Senior Product Designer',
            status: 'Pending',
            date: '2024-02-27',
            rating: 4.5,
        },
        {
            id: 2,
            candidateName: 'Michael Chen',
            jobTitle: 'Full Stack Developer',
            status: 'Reviewed',
            date: '2024-02-26',
            rating: 4.8,
        },
        {
            id: 3,
            candidateName: 'Emma Williams',
            jobTitle: 'UX Research Lead',
            status: 'Interview',
            date: '2024-02-25',
            rating: 4.2,
        },
    ];

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
                                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
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
                                    <p className="font-clash text-3xl font-bold text-gray-900">{stat.value}</p>
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
                                    {postedJobs.map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                                                <div className="flex gap-4 text-xs text-gray-600">
                                                    <span>{job.applications} applications</span>
                                                    <span>{job.views} views</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                                    {job.status}
                                                </span>
                                                <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                                                    <FiEdit2 className="text-gray-600" size={18} />
                                                </button>
                                                <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                                                    <FiTrash2 className="text-gray-600" size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
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
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">72%</p>
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
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Views</th>
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Status</th>
                                            <th className="text-left py-4 text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postedJobs.map((job) => (
                                            <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                                <td className="py-4 text-gray-900 font-medium">{job.title}</td>
                                                <td className="py-4 text-gray-600">{job.applications}</td>
                                                <td className="py-4 text-gray-600">{job.views}</td>
                                                <td className="py-4">
                                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 flex gap-2">
                                                    <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                                                        <FiEdit2 className="text-gray-600" size={18} />
                                                    </button>
                                                    <button className="p-2 hover:bg-gray-200 rounded-lg transition">
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
                                {recentApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{app.candidateName}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{app.jobTitle}</p>
                                            <p className="text-xs text-gray-500">{app.date}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-900">{app.rating}</p>
                                                <p className="text-xs text-gray-500">★★★★★</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${app.status === 'Pending'
                                                        ? 'bg-yellow-50 text-yellow-700'
                                                        : app.status === 'Reviewed'
                                                            ? 'bg-blue-50 text-blue-700'
                                                            : 'bg-purple-50 text-purple-700'
                                                    }`}
                                            >
                                                {app.status}
                                            </span>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                                Review
                                            </button>
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
