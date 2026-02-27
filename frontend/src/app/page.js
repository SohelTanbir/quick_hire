'use client';

import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobFilters from '@/components/jobs/JobFilters';
import JobList from '@/components/jobs/JobList';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import {
  setSearchFilter,
  setCategoryFilter,
  setLocationFilter,
  setJobTypeFilter,
  selectFilters,
} from '@/store/slices/jobsSlice';
import { useGetJobsQuery } from '@/store/services/api';

export default function Home() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [localSearch, setLocalSearch] = useState('');

  // Fetch jobs from API
  const { data: jobsData, isLoading, error } = useGetJobsQuery();
  const jobs = jobsData || [];

  // Filter jobs based on Redux state
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchTerm = (localSearch || filters.search).toLowerCase();
      const matchesSearch =
        !searchTerm ||
        job.title?.toLowerCase().includes(searchTerm) ||
        job.company?.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm);

      const matchesCategory =
        !filters.category || job.category === filters.category;

      const matchesLocation =
        !filters.location || job.location === filters.location;

      const matchesJobType =
        !filters.jobType || job.jobType === filters.jobType;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesJobType
      );
    });
  }, [jobs, filters, localSearch]);

  const handleSearch = (searchValue) => {
    setLocalSearch(searchValue);
    dispatch(setSearchFilter(searchValue));
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category':
        dispatch(setCategoryFilter(value));
        break;
      case 'location':
        dispatch(setLocationFilter(value));
        break;
      case 'jobType':
        dispatch(setJobTypeFilter(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="font-clash text-hero text-gray-900 dark:text-white mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="font-inter text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover amazing job opportunities tailored to your skills and interests.
            Browse, filter, and apply to your dream job today.
          </p>
        </section>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Layout: Filters and Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <JobFilters onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content - Jobs List */}
          <div className="lg:col-span-3">
            {error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
                  Error Loading Jobs
                </h3>
                <p className="text-red-600 dark:text-red-400">
                  Unable to fetch jobs. Please try again later.
                </p>
              </div>
            ) : isLoading ? (
              <div className="space-y-4">
                <LoadingSkeleton count={5} type="card" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-12 text-center">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4">
                  {jobs.length === 0
                    ? 'No jobs available at the moment. Please check back later.'
                    : 'No jobs match your current filters. Try adjusting your search criteria.'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold">{filteredJobs.length}</span> of{' '}
                    <span className="font-semibold">{jobs.length}</span> jobs
                  </p>
                </div>
                <JobList jobs={filteredJobs} loading={false} />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
