import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/usersSlice';
// import { apiSlice } from '../api/apiSlice';
import { setupListeners  } from "@reduxjs/toolkit/query";
// import { authReducer } from './authSlice';

export const store = configureStore({
    reducer: {
        users: userReducer
        // [apiSlice.reducerPath]: apiSlice.reducer,
        // auth: authReducer,
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice),
    devTools: true,
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch