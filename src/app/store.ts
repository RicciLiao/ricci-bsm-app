import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import appThemeSlice from "../features/appThemeSlice.ts";
import {apiSlice} from "./api/apiSlice.ts";
import appSnackbarSlice from "../features/appSnackbarSlice.ts";
import {XResponseCodeMiddleware} from "./middleware/x/XResponseCodeMiddleware";
import {XResponseRTKMiddleware} from "./middleware/x/XResponseRTKMiddleware";

const store = configureStore({
    reducer: {
        appTheme: appThemeSlice,
        appSnackbar: appSnackbarSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(new XResponseCodeMiddleware().build())
            .concat(new XResponseRTKMiddleware().build())
});

export {store};
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
