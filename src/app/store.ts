import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import appThemeSlice from "../features/appThemeSlice.ts";
import {apiSlice} from "./api/apiSlice.ts";
import {apiResponseCodeMiddleware} from "./middleware/apiResponseCodeMiddleware.ts";
import appSnackbarSlice from "../features/appSnackbarSlice.ts";

const store = configureStore({
    reducer: {
        appTheme: appThemeSlice,
        appSnackbar: appSnackbarSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(apiResponseCodeMiddleware)
    ,
});

export {store};
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
