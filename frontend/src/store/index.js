// Redux Store Configuration
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import { api } from './services/api';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;
