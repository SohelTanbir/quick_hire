'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EmployerCTASection() {
    return (
        <section className="py-20 bg-primary-600 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white">
                        <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
                            Start posting<br />jobs today
                        </h2>
                        <p className="text-blue-100 font-inter text-lg mb-8">
                            Start posting Jobs for only 10$
                        </p>
                        <Link
                            href="/employer/signup"
                            className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Sign Up for free
                        </Link>
                    </div>

                    {/* Right Dashboard Mockup */}
                    <div className="hidden lg:block">
                        <div className="bg-white rounded-2xl shadow-2xl p-4 h-80 relative overflow-hidden">
                            <Image
                                src="/assets/images/dashboard/dashboard-bg.png"
                                alt="Dashboard Background"
                                fill
                                className="object-cover opacity-40"
                            />
                            <Image
                                src="/assets/images/dashboard/dashboard-mokup.png"
                                alt="Dashboard Mockup"
                                fill
                                className="object-contain p-4 relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
