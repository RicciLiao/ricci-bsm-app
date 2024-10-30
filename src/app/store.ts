import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/ApiSlice.ts";
import appThemeSlice from "../features/AppThemeSlice.ts";

export const store = configureStore({
    reducer: {
        appTheme: appThemeSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>