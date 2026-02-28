'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';
import { useGetJobByIdQuery, useUpdateJobMutation } from '@/store/services/api';

const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const categories = [
    'Design',
    'Sales',
    'Marketing',
    'Finance',
    'Technology',
    'Engineering',
    'Business',
    'Human Resources',
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function EditJobPage() {
    const router = useRouter();
    const params = useParams();
    const jobId = params?.id;

    const { data: jobResponse, isLoading } = useGetJobByIdQuery(jobId, { skip: !jobId });
    const [updateJob] = useUpdateJobMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: 'Full-time',
        salary: '',
        category: 'Technology',
        description: '',
        requirements: [''],
        responsibilities: [''],
        companyDescription: '',
    });

    useEffect(() => {
        const job = jobResponse?.data;
        if (!job) return;

        setFormData({
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            jobType: job.jobType || 'Full-time',
            salary: job.salary || '',
            category: job.category || 'Technology',
            description: job.description || '',
            requirements: job.requirements?.length ? job.requirements : [''],
            responsibilities: job.responsibilities?.length ? job.responsibilities : [''],
            companyDescription: job.companyDescription || '',
        });
    }, [jobResponse]);

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
            [field]: newArray.length ? newArray : [''],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        const cleanedPayload = {
            ...formData,
            requirements: formData.requirements.map((item) => item.trim()).filter(Boolean),
            responsibilities: formData.responsibilities.map((item) => item.trim()).filter(Boolean),
        };

        try {
            await updateJob({ id: jobId, ...cleanedPayload }).unwrap();
            router.push('/admin');
        } catch (error) {
            const message = error?.data?.message || 'Failed to update job. Please try again.';
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100 pt-20 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h1 className="font-clash text-4xl font-bold text-gray-900 mb-2">Edit Job Listing</h1>
                        <p className="text-gray-600 mb-8">Update job details and save changes.</p>

                        {isLoading ? (
                            <p className="text-gray-500">Loading job details...</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Basic Information</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">Job Title *</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">Company Name *</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">Location *</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">Job Type *</label>
                                                <select
                                                    name="jobType"
                                                    value={formData.jobType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                >
                                                    {jobTypes.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">Salary (Optional)</label>
                                                <input
                                                    type="text"
                                                    name="salary"
                                                    value={formData.salary}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">Category *</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                >
                                                    {categories.map((cat) => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-8">
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">Job Description</h2>
                                    <div className="space-y-6">
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={8}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />

                                        <textarea
                                            name="companyDescription"
                                            value={formData.companyDescription}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Company description (optional)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

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
                                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('responsibilities', idx)}
                                                    className="p-3 hover:bg-gray-100 rounded-lg transition"
                                                >
                                                    <FiX className="text-gray-600" size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
                                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('requirements', idx)}
                                                    className="p-3 hover:bg-gray-100 rounded-lg transition"
                                                >
                                                    <FiX className="text-gray-600" size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-8 flex gap-4 flex-wrap">
                                    {submitError && (
                                        <p className="w-full text-sm text-red-600 -mt-2 mb-2">{submitError}</p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="flex-1 min-w-50 px-6 py-3 border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors font-epilogue font-bold text-base leading-[160%]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 min-w-50 px-6 py-3 bg-[#4640DE] text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-epilogue font-bold text-base leading-[160%] flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <LoadingSpinner />
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
