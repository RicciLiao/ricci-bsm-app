import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {AppSnackbarInterface} from "../interfaces/AppSnackbarInterface.ts";

interface AppSnackbarState extends AppSnackbarInterface {
}

const initialState = {} as AppSnackbarState;

const appSnackbarSlice = createSlice({
    name: "appSnackbar",
    initialState,
    reducers: {
        add: (state: AppSnackbarState, action: PayloadAction<AppSnackbarInterface>) => {
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