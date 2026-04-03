import appThemeSlice from "@app/slice/appThemeSlice.ts";
import {appConstants} from "@common/appConstants.ts";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {createXStore} from "x-common-components-app";

const store = createXStore({
    projectCode: appConstants.PROJECT_CODE,
    extraReducers: {
        appTheme: appThemeSlice,
    },
});

export {store};
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
// Explicitly define RootState to include all reducers
export interface RootState {
    appSnackbar: ReturnType<typeof import("x-common-components-app").appSnackbarSliceReducer>;
    api: ReturnType<typeof import("x-common-components-app").apiSlice.reducer>;
    appTheme: ReturnType<typeof appThemeSlice>;
}
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
