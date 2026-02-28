'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';

const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

export default function NewJobPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        jobType: 'Full time',
        salary: '',
        category: 'Development',
        description: '',
        requirements: [''],
        responsibilities: [''],
    });

    const categories = [
        'Development',
        'Design',
        'Marketing',
        'Finance',
        'Sales',
        'Product',
        'HR',
        'Operations',
    ];

    const jobTypes = ['Full time', 'Part time', 'Contract', 'Temporary', 'Freelance'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData((prev) => ({
            ...prev,
            [field]: newArray,
        }));
    };

    const addArrayItem = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ''],
        }));
    };

    const removeArrayItem = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            [field]: newArray,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send form data to API
        console.log('Form submitted:', formData);
        router.push('/admin');
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

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h1 className="font-clash text-4xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                        <p className="text-gray-600 mb-8">Fill out the details below to create a new job listing.</p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div>
                                <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Basic Information</h2>
                                <div className="space-y-6">
                                    {/* Job Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Senior Product Designer"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Location & Job Type */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="e.g., San Francisco, CA"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Job Type *
                                            </label>
                                            <select
                                                name="jobType"
                                                value={formData.jobType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            >
                                                {jobTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Salary & Category */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Salary (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="salary"
                                                value={formData.salary}
                                                onChange={handleInputChange}
                                                placeholder="e.g., $80,000 - $120,000"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="border-t border-gray-200 pt-8">
                                <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Job Description</h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the job role, responsibilities, and what you're looking for in a candidate..."
                                        required
                                        rows={8}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Key Responsibilities */}
                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900">Key Responsibilities</h2>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('responsibilities')}
                                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                                    >
                                        <FiPlus size={18} />
                                        Add Item
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.responsibilities.map((resp, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={resp}
                                                onChange={(e) => handleArrayChange('responsibilities', idx, e.target.value)}
                                                placeholder={`Responsibility ${idx + 1}`}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                            {formData.responsibilities.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('responsibilities', idx)}
                                                    className="p-3 hover:bg-gray-100 rounded-lg transition"
                                                >
                                                    <FiX className="text-gray-600" size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900">Requirements</h2>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('requirements')}
                                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                                    >
                                        <FiPlus size={18} />
                                        Add Item
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.requirements.map((req, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={req}
                                                onChange={(e) => handleArrayChange('requirements', idx, e.target.value)}
                                                placeholder={`Requirement ${idx + 1}`}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                            {formData.requirements.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('requirements', idx)}
                                                    className="p-3 hover:bg-gray-100 rounded-lg transition"
                                                >
                                                    <FiX className="text-gray-600" size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="border-t border-gray-200 pt-8 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors font-epilogue font-bold text-base leading-[160%]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 bg-[#4640DE] text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-epilogue font-bold text-base leading-[160%] flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSpinner />
                                            Posting...
                                        </>
                                    ) : (
                                        'Post Job'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
