import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SERVER_URL } from "../constants/server";
import { User } from '../types'
import axios from "axios";

type Error = {
    message: string;
}

interface UserState {
    currentUser: User,
    status: string,
    error: string,
}

type UserSlice = {
    users: UserState
}

const initialState = {
    currentUser: {},
    token: null,
    hasError: false,
    hasSuccess: false,
    isLoading: false,
    message: '',
}

export const postUser = createAsyncThunk('/users', async (body: User) => {
    try {
        let res;
        await axios.post(`${SERVER_URL}/users`, body)
            .then((response) => {
                res = response.data
            })
            .catch((err) => {
                throw(err.message)
            })
        return res;
    } catch(err: unknown) {
        return (err as Error).message;
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: {
            reducer(state, action:  PayloadAction<User>) {
                state.currentUser = action.payload;
            },
            prepare(email: string, password: string, watched: Array<string>) {
                return {
                    payload: {
                        email,
                        password,
                        watched,
                    }
                }
            }
        },
        removeCurrentUser: {
            reducer(state) {
                state.currentUser = {}
            },
            prepare() {
                return {
                    payload: {}
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(postUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || '';
            })
    }
})

export const getCurrentUser = (state: UserSlice) => state.users.currentUser;
export const getAddUserStatus = (state: UserSlice) => state.users.status;
export const getAddUserError = (state: UserSlice) => state.users.error;

export const { addUser, removeCurrentUser } = usersSlice.actions

export default usersSlice.reducer;