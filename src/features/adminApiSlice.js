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
    })
});

export const {
    useFetchMovieMutation,
} = adminApiSlice;
