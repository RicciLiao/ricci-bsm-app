import {createAsyncThunk} from "@reduxjs/toolkit"

import type {AppDispatch, RootState} from "./store"

const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
}>();

export {createAppAsyncThunk};