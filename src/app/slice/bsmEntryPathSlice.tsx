import {RootState} from "@app/store.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface BsmEntryPathState {
    currentPathId: number,
}

const initialState: BsmEntryPathState = {
    currentPathId: 0,
}

const bsmEntryPathSlice = createSlice({
    name: "bsmEntryPath",
    initialState: initialState,
    reducers: {
        currentEntryPath: (state: BsmEntryPathState, action: PayloadAction<number>) => {
            state.currentPathId = action.payload;
        }
    }
});

export const selectCurrentEntryPathId = (state: RootState) => state.bsmEntryPath.currentPathId;
export const {currentEntryPath} = bsmEntryPathSlice.actions;

export default bsmEntryPathSlice.reducer;