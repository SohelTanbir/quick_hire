'use client';

import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
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
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [localSearch, setLocalSearch] = useState('');

  // Fetch jobs from API
  const { data: jobsData, isLoading, error } = useGetJobsQuery();

  // Ensure jobs is always an array
  const jobs = Array.isArray(jobsData)
    ? jobsData
    : Array.isArray(jobsData?.jobs)
      ? jobsData.jobs
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-linear-to-b from-blue-50 to-white pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="font-clash text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Discover<br />
                  more than<br />
                  <span className="text-primary-600 relative inline-block">
                    5000+ Jobs
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6C50 2 100 1 150 3C200 5 250 6 299 4" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
                <p className="font-inter text-lg text-gray-600 mb-10 max-w-lg">
                  Great platform for the job seeker that is searching for new career heights and passionate about startups.
                </p>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-lg p-3 mb-6">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 flex items-center gap-2 px-4 py-2 border-r border-gray-200">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={localSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-4 py-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Florence, Italy"
                        className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-md transition-colors whitespace-nowrap">
                      Search my job
                    </button>
                  </div>
                </div>

                {/* Popular Suggestions */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-600 text-sm">Popular:</span>
                  {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag) => (
                    <button key={tag} className="text-sm text-gray-700 hover:text-primary-600 transition">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-100 rounded-3xl transform rotate-6"></div>
                  <div className="relative bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Hero Image Placeholder</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="mt-16">
              <p className="text-gray-500 text-sm mb-6">Companies we helped grow</p>
              <div className="flex flex-wrap items-center gap-8 opacity-60">
                <div className="text-gray-400 font-semibold text-xl">vodafone</div>
                <div className="text-gray-400 font-semibold text-xl">intel</div>
                <div className="text-gray-400 font-semibold text-xl tracking-wider">TESLA</div>
                <div className="text-gray-400 font-semibold text-xl">AMD</div>
                <div className="text-gray-400 font-semibold text-xl">Talkit</div>
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
                {filteredJobs.slice(0, 8).map((job) => (
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
