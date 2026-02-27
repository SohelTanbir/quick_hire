// Jobs Slice for local state management
import { createSlice } from '@reduxjs/toolkit';

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    filters: {
      search: '',
      category: '',
      location: '',
      jobType: '',
    },
  },
  reducers: {
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setLocationFilter: (state, action) => {
      state.filters.location = action.payload;
    },
    setJobTypeFilter: (state, action) => {
      state.filters.jobType = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        location: '',
        jobType: '',
      };
    },
  },
});

export const {
  setSearchFilter,
  setCategoryFilter,
  setLocationFilter,
  setJobTypeFilter,
  clearFilters,
} = jobsSlice.actions;

export default jobsSlice.reducer;
