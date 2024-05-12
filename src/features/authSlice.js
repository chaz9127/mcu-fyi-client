import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {},
    token: null,
    hasError: false,
    hasSuccess: false,
    isLoading: false,
    message: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredientals: (state, action) => {
            const { email, role, watched, accessToken } = action.payload
            state.currentUser = { email, role, watched };
            state.token = accessToken;
            localStorage.setItem('accessToken', accessToken);
        },
        logOut: (state) => {
            state.token = null;
            state.currentUser = null;
            localStorage.removeItem('accessToken');
        },
        updateUser: (state, action) => {
            const { email, role, watched } = action.payload
            state.currentUser = { email, role, watched };
        }
    }
})

export const { setCredientals, logOut, updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.currentUser;
