'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

export default function AdminProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        companyName: 'TechCorp Inc.',
        email: 'hr@techcorp.com',
        phone: '+1 (555) 123-4567',
        website: 'www.techcorp.com',
        location: 'San Francisco, CA',
        description: 'A leading technology company focused on innovative solutions.',
        employees: '500-1000',
        founded: '2015',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send form data to API
        console.log('Profile updated:', formData);
        setIsEditing(false);
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100 pt-20 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>

                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Header Background */}
                        <div className="h-32 bg-linear-to-r from-primary-600 to-primary-700"></div>

                        {/* Profile Content */}
                        <div className="px-8 pb-8">
                            {/* Company Logo & Name */}
                            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8 -mt-16 relative z-10">
                                <div className="w-32 h-32 bg-white border-4 border-white rounded-xl shadow-lg flex items-center justify-center bg-primary-50">
                                    <span className="text-5xl font-bold text-primary-600">TC</span>
                                </div>
                                <div className="flex-1">
                                    <h1 className="font-clash text-4xl font-bold text-gray-900">{formData.companyName}</h1>
                                    <p className="text-gray-600">Employer Account</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            {/* Form or Display Mode */}
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Logo Upload */}
                                    <div>
                                        <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Company Logo</h2>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-600 transition cursor-pointer">
                                            <FiUpload className="mx-auto text-gray-400 mb-2" size={32} />
                                            <p className="text-gray-900 font-medium mb-1">Upload company logo</p>
                                            <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                                        </div>
                                    </div>

                                    {/* Company Information */}
                                    <div className="border-t border-gray-200 pt-8">
                                        <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Company Information</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Website
                                                </label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                                        Founded
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="founded"
                                                        value={formData.founded}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Description */}
                                    <div className="border-t border-gray-200 pt-8">
                                        <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">About Company</h2>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Save Button */}
                                    <div className="border-t border-gray-200 pt-8 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-8">
                                    {/* Company Info Display */}
                                    <div>
                                        <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Company Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                                <p className="font-medium text-gray-900">{formData.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Phone</p>
                                                <p className="font-medium text-gray-900">{formData.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Website</p>
                                                <p className="font-medium text-gray-900">{formData.website}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Location</p>
                                                <p className="font-medium text-gray-900">{formData.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Employees</p>
                                                <p className="font-medium text-gray-900">{formData.employees}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Founded</p>
                                                <p className="font-medium text-gray-900">{formData.founded}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* About Company */}
                                    <div className="border-t border-gray-200 pt-8">
                                        <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-4">About Company</h2>
                                        <p className="text-gray-700 leading-relaxed">{formData.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
