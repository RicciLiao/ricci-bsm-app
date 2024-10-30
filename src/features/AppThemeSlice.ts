import {createSlice, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface AppThemeState {
    customCss: boolean,
}

const initialState: AppThemeState = {
    customCss: true,
}

const appThemeSlice = createSlice<AppThemeState, SliceCaseReducers<AppThemeState>>({
    name: 'appTheme',
    initialState,
    reducers: {
        custom: {
            reducer(state: RootState, action: PayloadAction<boolean>) {
                state.customCss = action.payload;
            },
        },
    }
});

export const selectCurrentCss = (state: RootState) => state.appTheme.customCss;
export const {custom} = appThemeSlice.actions;

export default appThemeSlice.reducer;