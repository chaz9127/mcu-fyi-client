import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter({})
const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/user',
            validateStatus: ( response, result ) => {
                return response.status === 200 && !result.hasError;
            },
            transformResponse: responseData => {
                const loadUser = responseData;
                userAdapter.setAll(initialState, loadUser)
            },
            // may need provideTags - https://youtu.be/TPAAQnVxc-I?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&t=719
        })
    })
})

export const {
    useGetUserQuery,
} = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUser.select();

const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data
)

export const {
    selectById: selectUserById,
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)