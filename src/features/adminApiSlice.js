import { apiSlice } from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchMedia: builder.mutation({
            query: ({ type, title }) => ({
                url: `/admin/fetch-${type}`,
                method: 'POST',
                body: { title }
            })
        }),
        insertMedia: builder.mutation({
            query: source => ({
                url: '/admin/media',
                method: 'POST',
                body: { source }
            })
        }),
    })
});

export const {
    useFetchMediaMutation,
    useInsertMediaMutation,
} = adminApiSlice;
