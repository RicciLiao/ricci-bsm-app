import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {AppSnackbar} from "../interfaces/AppSnackbar.ts";

interface AppSnackbarState extends AppSnackbar {
}

const initialState = {} as AppSnackbarState;

const appSnackbarSlice = createSlice({
    name: "appSnackbar",
    initialState,
    reducers: {
        add: (state: AppSnackbarState, action: PayloadAction<AppSnackbar>) => {
            state.message = action.payload.message;
            state.date = action.payload.date;
            state.alertType = action.payload.alertType;
        },
        remove: () => {

            return initialState;
        }
    }
});

export const selectCurrentSnackbar = (state: RootState) => state.appSnackbar;
export const {add, remove} = appSnackbarSlice.actions;

export default appSnackbarSlice.reducer;