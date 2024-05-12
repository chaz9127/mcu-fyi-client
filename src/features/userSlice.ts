import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  currentUser: {},
  token: null,
  hasError: false,
  hasSuccess: false,
  isLoading: false,
  message: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            console.log('action.payload', action.payload);
            const { email, role, watched } = action.payload
            state.currentUser = { email, role, watched };
        },
    }
});

export const userEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
      updateUser: builder.mutation({
          query: credentials => {
            console.log({credentials})
            return {
              url: '/users',
              method: 'PATCH',
              body: {...credentials}
          }}
      }),
  })
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.currentUser;

export const {
    useUpdateUserMutation,
} = userEndpoints;