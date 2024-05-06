import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(process.env.VITE_SERVER_SERVER),
    tagTypes: ['User'],
    endpoints: builder => ({})
})