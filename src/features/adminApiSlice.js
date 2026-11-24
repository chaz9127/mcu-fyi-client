import { apiSlice } from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchMovie: builder.mutation({
            query: title => ({
                url: '/admin/fetch-movie',
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
    useFetchMovieMutation,
    useInsertMediaMutation,
} = adminApiSlice;
