import { apiSlice } from "../api/apiSlice";

export const feedbackApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        submitFeedback: builder.mutation({
            query: ({ email, feedback }) => ({
                url: '/feedback',
                method: 'POST',
                body: { email, feedback }
            })
        }),
        // status is 'read', 'unread', or 'all'.
        getFeedback: builder.query({
            query: status => ({
                url: '/admin/feedback',
                params: status && status !== 'all' ? { status } : undefined
            }),
            providesTags: ['Feedback'],
        }),
        markFeedbackRead: builder.mutation({
            query: id => ({
                url: `/admin/feedback/${id}`,
                method: 'PATCH',
                body: { status: 'read' }
            }),
            invalidatesTags: ['Feedback'],
        }),
    })
});

export const {
    useSubmitFeedbackMutation,
    useGetFeedbackQuery,
    useMarkFeedbackReadMutation,
} = feedbackApiSlice;
