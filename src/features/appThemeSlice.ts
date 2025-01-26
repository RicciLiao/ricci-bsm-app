import {RootState} from "../app/store.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AppThemeState {
    customCss: boolean,
}

const initialState: AppThemeState = {
    customCss: false,
}

const appThemeSlice = createSlice({
    name: 'appTheme',
    initialState,
    reducers: {
        custom(state: AppThemeState, action: PayloadAction<boolean>) {
            state.customCss = action.payload;
        },
    }
});

export const selectCurrentCss = (state: RootState) => state.appTheme.customCss;
export const {custom} = appThemeSlice.actions;

export default appThemeSlice.reducer;