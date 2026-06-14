import appThemeSlice from "@app/slice/appThemeSlice.ts";
import bsmEntryPathSlice from "@app/slice/bsmEntryPathSlice.tsx";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {createXStore} from "x-common-components-app";
import {bsmConstants} from "../common/bsmConstants.ts";

const store = createXStore({
    projectCode: bsmConstants.PROJECT_CODE,
    extraReducers: {
        appTheme: appThemeSlice,
        bsmEntryPath: bsmEntryPathSlice,
    },
});

export {store};
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
// Explicitly define RootState to include all reducers
export interface RootState {
    appSnackbar: ReturnType<typeof import("x-common-components-app").AppSnackbarSliceReducer>;
    api: ReturnType<typeof import("x-common-components-app").apiSlice.reducer>;
    appTheme: ReturnType<typeof appThemeSlice>;
    bsmEntryPath: ReturnType<typeof bsmEntryPathSlice>;
}
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
