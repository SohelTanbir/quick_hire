// RTK Query API Configuration
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // Jobs endpoints
    getJobs: builder.query({
      query: (params = {}) => ({
        url: '/jobs',
        params,
      }),
    }),
    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
    }),
    createJob: builder.mutation({
      query: (jobData) => ({
        url: '/jobs',
        method: 'POST',
        body: jobData,
      }),
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
    }),

    // Applications endpoints
    submitApplication: builder.mutation({
      query: (applicationData) => ({
        url: '/applications',
        method: 'POST',
        body: applicationData,
      }),
    }),
    getApplications: builder.query({
      query: () => '/applications',
    }),
    getApplicationsByJob: builder.query({
      query: (jobId) => `/applications/job/${jobId}`,
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useSubmitApplicationMutation,
  useGetApplicationsQuery,
  useGetApplicationsByJobQuery,
} = api;
