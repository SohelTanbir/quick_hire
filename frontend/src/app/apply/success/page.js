'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function ApplicationSuccessPage() {
    const searchParams = useSearchParams();
    const jobTitle = searchParams.get('jobTitle') || 'the position';

    return (
        <>
            <Header />
            <main className="min-h-screen bg-linear-to-b from-green-50 to-white flex items-center pt-20 pb-20">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <div className="mb-8">
                        <FiCheckCircle className="mx-auto text-green-600 mb-6" size={80} />
                    </div>

                    <h1 className="font-clash text-4xl font-bold text-gray-900 mb-4">
                        Application Submitted!
                    </h1>

                    <p className="text-gray-600 text-lg mb-2">
                        Thank you for applying for <strong>{jobTitle}</strong>
                    </p>

                    <p className="text-gray-600 mb-12">
                        We've received your application and will review it shortly. We'll notify you via email if you move forward in the process.
                    </p>

                    {/* What Happens Next */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12 text-left">
                        <h2 className="font-epilogue font-semibold text-xl text-gray-900 mb-6">What happens next?</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                                    1
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Resume Review</p>
                                    <p className="text-sm text-gray-600">Our team will review your resume and qualifications</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                                    2
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Initial Screening</p>
                                    <p className="text-sm text-gray-600">We'll conduct a quick screening to ensure fit</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                                    3
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Interview</p>
                                    <p className="text-sm text-gray-600">If selected, we'll schedule an interview with you</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                                    4
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">Offer</p>
                                    <p className="text-sm text-gray-600">If we move forward, we'll extend an offer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/jobs"
                            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium group"
                        >
                            Explore More Jobs
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
