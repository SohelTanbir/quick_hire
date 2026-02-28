'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CategoriesSection from '@/components/home/CategoriesSection';
import EmployerCTASection from '@/components/home/EmployerCTASection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import JobCard from '@/components/jobs/JobCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import {
  setSearchFilter,
  selectFilters,
} from '@/store/slices/jobsSlice';
import { useGetJobsQuery } from '@/store/services/api';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [localSearch, setLocalSearch] = useState('');
  const [localLocation, setLocalLocation] = useState('');

  // Fetch jobs from API
  const { data: jobsData, isLoading, error } = useGetJobsQuery();

  // Ensure jobs is always an array
  const jobs = Array.isArray(jobsData)
    ? jobsData
    : Array.isArray(jobsData?.data)
      ? jobsData.data
      : [];

  // Filter jobs based on Redux state
  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];

    return jobs.filter((job) => {
      const searchTerm = (localSearch || filters.search).toLowerCase();
      const matchesSearch =
        !searchTerm ||
        job.title?.toLowerCase().includes(searchTerm) ||
        job.company?.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm);

      return matchesSearch;
    });
  }, [jobs, filters, localSearch]);

  const handleSearch = (searchValue) => {
    setLocalSearch(searchValue);
    dispatch(setSearchFilter(searchValue));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-[#F8F8FD] pt-12 md:pt-20 pb-12 md:pb-20 relative overflow-hidden">
          {/* Background Decorative Lines - Desktop Only */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="absolute top-0 right-0 w-1/2 h-full opacity-20" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 0 L500 400" stroke="#4640DE" strokeWidth="2" />
              <path d="M200 0 L600 400" stroke="#4640DE" strokeWidth="2" />
              <path d="M0 200 L400 600" stroke="#4640DE" strokeWidth="2" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1">
                <h1 className="font-clash text-4xl md:text-5xl lg:text-6xl font-bold text-[#25324B] mb-4 md:mb-6 leading-tight">
                  Discover<br />
                  more than<br />
                  <span className="text-[#4640DE] relative inline-block">
                    5000+ Jobs
                    <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6C50 2 100 1 150 3C200 5 250 6 299 4" stroke="#4640DE" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
                <p className="font-inter text-base md:text-lg text-[#7C8493] mb-6 md:mb-8 max-w-lg">
                  Great platform for the job seeker that searching for new career heights and passionate about startups.
                </p>

                {/* Search Bar */}
                <div className="bg-white shadow-md p-2 mb-6 max-w-3xl">
                  <div className="flex flex-col md:flex-row items-stretch gap-0">
                    <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={localSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 min-w-0 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm md:text-base"
                      />
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0 border-b md:border-b-0 border-gray-200">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Florence, Italy"
                        value={localLocation}
                        onChange={(e) => setLocalLocation(e.target.value)}
                        className="flex-1 min-w-0 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm md:text-base"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (localSearch) params.set('search', localSearch);
                        if (localLocation) params.set('location', localLocation);
                        router.push(`/jobs?${params.toString()}`);
                      }}
                      className="bg-[#4640DE] hover:bg-primary-700 text-white font-epilogue font-bold text-base leading-[160%] px-6 md:px-8 py-3 transition-colors whitespace-nowrap"
                    >
                      Search my job
                    </button>
                  </div>
                </div>

                {/* Popular Suggestions */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#7C8493] text-sm font-inter">Popular :</span>
                  {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setLocalSearch(tag);
                        router.push(`/jobs?search=${encodeURIComponent(tag)}`);
                      }}
                      className="text-sm text-[#7C8493] hover:text-primary-600 transition font-inter"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="order-1 lg:order-2 hidden lg:block">
                <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/assets/images/hero/hero-man.png"
                    alt="Job seeker hero"
                    fill
                    className="object-contain object-center"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="mt-12 md:mt-16">
              <p className="text-[#7C8493] text-sm font-inter mb-4 md:mb-6">Companies we helped grow</p>
              <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8 opacity-70">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Image
                    key={idx}
                    src={`/assets/images/companies/${idx + 1}.png`}
                    alt={`Company logo ${idx + 1}`}
                    width={120}
                    height={40}
                    className="object-contain hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 container mx-auto px-4">
          <CategoriesSection />
        </section>

        {/* Employer CTA Section */}
        <EmployerCTASection />

        {/* Featured Jobs Section */}
        <FeaturedJobsSection />

        {/* Latest Jobs Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-clash text-4xl font-bold text-gray-900">
                Latest <span className="text-primary-600">jobs open</span>
              </h2>
              <Link
                href="/jobs"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
              >
                Show all jobs
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Jobs
                </h3>
                <p className="text-red-600">
                  Unable to fetch jobs. Please try again later.
                </p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LoadingSkeleton count={6} type="card" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-blue-600 mb-4">
                  {jobs.length === 0
                    ? 'No jobs available at the moment. Please check back later.'
                    : 'No jobs match your search. Try different keywords.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs
                  .sort((a, b) => {
                    // Sort by postedDate (most recent first)
                    const dateA = a.postedDate ? new Date(a.postedDate) : new Date(0);
                    const dateB = b.postedDate ? new Date(b.postedDate) : new Date(0);
                    return dateB - dateA;
                  })
                  .slice(0, 8)
                  .map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
