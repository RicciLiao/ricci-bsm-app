import {isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {add} from "../../features/appSnackbarSlice.ts";
import {AppSnackbarInterface} from "../../interfaces/AppSnackbarInterface.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {ResponseErrorInterface, ResponseInterface} from "../../interfaces/api/response/ResponseInterface.ts";
import {apiSlice} from "../api/apiSlice.ts";
import {Action} from "redux";

function isApiSliceErrorPayload(payload: any): payload is ResponseInterface<ResponseErrorInterface> {

    return payload && payload.data;
}

function isApiSliceAction(action: any): action is Action {

    return action.type.startsWith(`${apiSlice.reducerPath}/`);
}

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isApiSliceAction(action)
        && isRejectedWithValue(action)
        && isApiSliceErrorPayload(action.payload)) {
        const appSnackBar: AppSnackbarInterface = {
            message: "From apiErrorMiddleware message",
            date: action.payload.data.date,
            alertType: AppConstants.SNACKBAR_SEVERITY_TYPE.error
        }
        api.dispatch(add(appSnackBar))
    }

    return next(action);
}