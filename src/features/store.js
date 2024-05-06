import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice';
import { setupListeners  } from "@reduxjs/toolkit/query";
import { authReducer } from './authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apliSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice),
    devTools: true,
})

setupListeners(store.dispatch);