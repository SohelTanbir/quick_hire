'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EmployerCTASection() {
    return (
        <section className="py-20 relative overflow-hidden min-h-[600px]">
            {/* Full Section Background */}
            <Image
                src="/assets/images/dashboard/dashboard-bg.png"
                alt="Dashboard Background"
                fill
                className="object-cover"
                priority
            />

            {/* Content Overlay */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white">
                        <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
                            Start posting<br />jobs today
                        </h2>
                        <p className="text-white/90 font-inter text-lg mb-8">
                            Start posting Jobs for only 10$
                        </p>
                        <Link
                            href="/employer/signup"
                            className="inline-block bg-[#4640DE] hover:bg-primary-700 text-white font-epilogue font-bold text-base leading-[160%] px-8 py-3 transition-colors"
                        >
                            Sign Up for free
                        </Link>
                    </div>

                    {/* Right Dashboard Mockup */}
                    <div className="hidden lg:block relative h-96">
                        <Image
                            src="/assets/images/dashboard/dashboard-mokup.png"
                            alt="Dashboard Mockup"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
