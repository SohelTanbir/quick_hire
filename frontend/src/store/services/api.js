// RTK Query API Configuration
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Custom fetch base query with error handling
 */
const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        // Add any custom headers here if needed (e.g., authorization tokens)
        return headers;
    },
});

/**
 * Wrapper around fetch base query with error handling
 */
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        console.error('API Error:', result.error);

        // Handle specific error types
        if (result.error.status === 401) {
            // Unauthorized - could trigger logout
            console.warn('Unauthorized access - user may need to login');
        } else if (result.error.status === 403) {
            // Forbidden
            console.warn('Access forbidden');
        } else if (result.error.status === 404) {
            // Not found
            console.warn('Resource not found');
        } else if (result.error.status === 500) {
            // Server error
            console.error('Server error occurred');
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Jobs', 'Applications'],
    endpoints: (builder) => ({
        // Jobs endpoints
        getJobs: builder.query({
            query: (params = {}) => ({
                url: '/jobs',
                params,
            }),
            providesTags: ['Jobs'],
        }),
        getJobById: builder.query({
            query: (id) => `/jobs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Jobs', id }],
        }),
        createJob: builder.mutation({
            query: (jobData) => ({
                url: '/jobs',
                method: 'POST',
                body: jobData,
            }),
            invalidatesTags: ['Jobs'],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    console.log('Job created successfully');
                } catch (error) {
                    console.error('Failed to create job:', error);
                }
            },
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Jobs'],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    console.log('Job deleted successfully');
                } catch (error) {
                    console.error('Failed to delete job:', error);
                }
            },
        }),

        // Applications endpoints
        submitApplication: builder.mutation({
            query: (applicationData) => ({
                url: '/applications',
                method: 'POST',
                body: applicationData,
            }),
            invalidatesTags: ['Applications'],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    console.log('Application submitted successfully');
                } catch (error) {
                    console.error('Failed to submit application:', error);
                }
            },
        }),
        getApplications: builder.query({
            query: () => '/applications',
            providesTags: ['Applications'],
        }),
        getApplicationsByJob: builder.query({
            query: (jobId) => `/applications/job/${jobId}`,
            providesTags: (result, error, jobId) => [{ type: 'Applications', id: jobId }],
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
