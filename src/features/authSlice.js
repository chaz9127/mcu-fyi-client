import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
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
            const { accessToken } = action.payload
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.token = null;
        }
    }
})

export const { setCredientals, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
