'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FiArrowLeft, FiUpload, FiX } from 'react-icons/fi';

function ApplicationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');
    const jobTitle = searchParams.get('jobTitle') || 'this position';

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
        resume: null,
        coverLetter: '',
        experience: '',
        education: '',
        skills: [],
        currentSkill: '',
        agreeToTerms: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] : value,
        }));
    };

    const handleAddSkill = () => {
        if (formData.currentSkill.trim()) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, prev.currentSkill],
                currentSkill: '',
            }));
        }
    };

    const handleRemoveSkill = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Send form data to API
        setTimeout(() => {
            setIsSubmitting(false);
            router.push(`/apply/success?jobTitle=${encodeURIComponent(jobTitle)}`);
        }, 1500);
    };

    // If no jobId is provided, show error message
    if (!jobId) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white pt-20 pb-20">
                    <div className="container mx-auto px-4 max-w-2xl text-center">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                            <h1 className="font-clash text-3xl font-bold text-gray-900 mb-4">
                                Invalid Application Link
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Please navigate to this page from a job posting to apply.
                            </p>
                            <Link
                                href="/jobs"
                                className="inline-block px-8 py-3 bg-[#4640DE] text-white hover:bg-primary-700 transition-colors font-epilogue font-bold text-base leading-[160%]"
                            >
                                Browse Jobs
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-linear-to-b from-blue-50 to-white pt-20 pb-20">
                <div className="container mx-auto px-4 max-w-2xl">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`flex-1 h-2 rounded-full transition ${s <= step ? 'bg-primary-600' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Step {step} of 3
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                        {/* Header */}
                        <h1 className="font-clash text-4xl font-bold text-gray-900 mb-2">
                            Apply for {jobTitle}
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Tell us about yourself and why you're interested in this role.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Step 1: Personal Information */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900">Personal Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="John"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Doe"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 123-4567"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="San Francisco, CA"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                LinkedIn Profile
                                            </label>
                                            <input
                                                type="url"
                                                name="linkedin"
                                                value={formData.linkedin}
                                                onChange={handleInputChange}
                                                placeholder="linkedin.com/in/yourprofile"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Portfolio
                                            </label>
                                            <input
                                                type="url"
                                                name="portfolio"
                                                value={formData.portfolio}
                                                onChange={handleInputChange}
                                                placeholder="www.yourportfolio.com"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Background & Resume */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900">Background</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Years of Experience *
                                        </label>
                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Select experience level</option>
                                            <option value="0-1">0-1 years</option>
                                            <option value="1-3">1-3 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="5-10">5-10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Highest Education *
                                        </label>
                                        <select
                                            name="education"
                                            value={formData.education}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Select education level</option>
                                            <option value="high-school">High School</option>
                                            <option value="bachelors">Bachelor's Degree</option>
                                            <option value="masters">Master's Degree</option>
                                            <option value="phd">PhD</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-3">
                                            Skills *
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                name="currentSkill"
                                                value={formData.currentSkill}
                                                onChange={handleInputChange}
                                                placeholder="e.g., React, Design, Product Management"
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddSkill}
                                                className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skills.map((skill, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full border border-primary-200"
                                                >
                                                    <span className="text-sm font-medium">{skill}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(idx)}
                                                        className="hover:text-primary-900"
                                                    >
                                                        <FiX size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Resume/CV *
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-600 transition cursor-pointer">
                                            <input
                                                type="file"
                                                name="resume"
                                                onChange={handleInputChange}
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                id="resume-upload"
                                                required
                                            />
                                            <label htmlFor="resume-upload" className="cursor-pointer">
                                                <FiUpload className="mx-auto text-gray-400 mb-2" size={32} />
                                                <p className="text-gray-900 font-medium mb-1">Upload your resume</p>
                                                <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                                                {formData.resume && (
                                                    <p className="text-sm text-green-600 mt-2 font-medium">{formData.resume.name}</p>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Cover Letter & Agreement */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="font-epilogue font-semibold text-xl text-gray-900">Cover Letter</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Cover Letter (Optional)
                                        </label>
                                        <textarea
                                            name="coverLetter"
                                            value={formData.coverLetter}
                                            onChange={handleInputChange}
                                            placeholder="Tell the employer why you're interested in this role and why you'd be a great fit..."
                                            rows={8}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                        <div className="flex gap-3">
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                id="agree-terms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleInputChange}
                                                required
                                                className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-2 focus:ring-primary-500"
                                            />
                                            <label htmlFor="agree-terms" className="text-sm text-gray-700">
                                                I agree that my submitted information will be reviewed by the employer and may be used for hiring purposes. I understand that my data will be handled according to the privacy policy.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 pt-8 border-t border-gray-200">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-epilogue font-bold text-base leading-[160%]"
                                    >
                                        Previous
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step + 1)}
                                        className={`flex-1 px-6 py-3 bg-[#4640DE] text-white hover:bg-primary-700 transition-colors font-epilogue font-bold text-base leading-[160%] ${step === 1 &&
                                                (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.location)
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                            }`}
                                        disabled={
                                            step === 1 &&
                                            (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.location)
                                        }
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={!formData.agreeToTerms || isSubmitting}
                                        className="flex-1 px-6 py-3 bg-[#4640DE] text-white hover:bg-primary-700 transition-colors font-epilogue font-bold text-base leading-[160%] disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function ApplicationPage() {
    return (
        <Suspense fallback={
            <>
                <Header />
                <main className="min-h-screen bg-linear-to-b from-blue-50 to-white pt-20 pb-20">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                                <div className="space-y-4">
                                    <div className="h-12 bg-gray-200 rounded"></div>
                                    <div className="h-12 bg-gray-200 rounded"></div>
                                    <div className="h-12 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        }>
            <ApplicationForm />
        </Suspense>
    );
}
