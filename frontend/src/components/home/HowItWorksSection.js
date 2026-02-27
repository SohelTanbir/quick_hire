'use client';

import { FiUserPlus, FiUpload, FiSearch, FiBriefcase } from 'react-icons/fi';

export default function HowItWorksSection() {
    const steps = [
        {
            icon: FiUserPlus,
            number: '01',
            title: 'Create account',
            description: 'Sign up for free and create your professional profile in minutes.',
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/30',
        },
        {
            icon: FiUpload,
            number: '02',
            title: 'Upload CV/Resume',
            description: 'Upload your resume and let employers find you easily.',
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-900/30',
        },
        {
            icon: FiSearch,
            number: '03',
            title: 'Find suitable job',
            description: 'Browse thousands of jobs and find the perfect match for your skills.',
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/30',
        },
        {
            icon: FiBriefcase,
            number: '04',
            title: 'Apply job',
            description: 'Submit your application with one click and get hired faster.',
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-900/30',
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl mb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-clash text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        How it works
                    </h2>
                    <p className="font-inter text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get started with QuickHire in just 4 simple steps and land your dream job.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="relative bg-white dark:bg-gray-800 rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:-translate-y-2"
                            >
                                {/* Step Number Badge */}
                                <div className="absolute -top-4 right-8">
                                    <span className="inline-block bg-primary-600 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${step.bgColor} mb-6 group-hover:scale-110 transition-transform`}>
                                    <Icon className={step.color} size={32} />
                                </div>

                                {/* Content */}
                                <h3 className="font-epilogue font-semibold text-xl text-gray-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="font-inter text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
