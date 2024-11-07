import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {apiErrorMiddleware} from "./middleware/apiErrorMiddleware.ts";
import appThemeSlice from "../features/appThemeSlice.ts";
import appSnackbarSlice from "../features/appSnackbarSlice.ts";
import {apiSlice} from "./api/apiSlice.ts";

export const store = configureStore({
    reducer: {
        appTheme: appThemeSlice,
        appSnackbar: appSnackbarSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(apiErrorMiddleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>