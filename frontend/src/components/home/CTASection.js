'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
    return (
        <section className="mb-20">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
                        Ready to get started?
                    </h2>
                    <p className="font-inter text-lg md:text-xl text-blue-50 max-w-2xl mx-auto mb-8">
                        Join thousands of job seekers who have found their dream careers through QuickHire.
                        Start your journey today!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/register"
                            className="px-8 py-3 bg-[#4640DE] text-white font-epilogue font-bold text-base leading-[160%] hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 group"
                        >
                            Create Free Account
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <Link
                            href="/employers"
                            className="px-8 py-3 bg-primary-700 text-white font-epilogue font-bold text-base leading-[160%] hover:bg-primary-800 transition-all duration-300 border-2 border-white/30"
                        >
                            Post a Job
                        </Link>
                    </div>

                    <p className="font-inter text-sm text-blue-100 mt-6">
                        No credit card required • Free for job seekers
                    </p>
                </div>
            </div>
        </section>
    );
}
