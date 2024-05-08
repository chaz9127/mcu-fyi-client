import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice';
import authReducer from './authSlice';

import userReducer from '../features/usersSlice';
import { setupListeners  } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        users: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch