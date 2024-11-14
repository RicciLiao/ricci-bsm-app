import {isFulfilled, isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {add} from "../../features/appSnackbarSlice.ts";
import {AppSnackbarInterface} from "../../interfaces/AppSnackbarInterface.ts";
import {
    ResponseDataInterface,
    ResponseInterface,
    ResponseStatusInterface
} from "../../interfaces/api/response/ResponseInterface.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {AppDispatch, RootState} from "../store.ts";
import {messageSlice} from "../api/messageSlice.ts";
import {bsmSlice} from "../api/bsmSlice.ts";
import {ApiPayloadAction, apiSlice} from "../api/apiSlice.ts";

const getProjectCodeByAction = (action: ApiPayloadAction): string => {
    if (Object.keys(bsmSlice.endpoints).find(endpointName => endpointName === action.meta.arg.endpointName)) {

        return "BSM";
    }
    isRejectedWithValue()

    return "";
}

const isResponseStatusPayload = (payload: ResponseInterface<ResponseDataInterface>): payload is ResponseInterface<ResponseStatusInterface> => {

    return payload && payload.code === -1;
}

const isApiSliceAction = (action: any): action is ApiPayloadAction => {

    return action.type.startsWith(`${apiSlice.reducerPath}/`) && isApiSliceActionWithMeta(action);
}

const isApiSliceActionCompletedWithError = (action: ApiPayloadAction): boolean => {

    return (isFulfilled(action) || isRejectedWithValue(action)) && action.payload && action.payload.code !== 0;
}

const isApiSliceActionWithMeta = (action: ApiPayloadAction): boolean => {

    return (!!(
        "meta" in action && action.meta && typeof action.meta === "object"
        && "arg" in action.meta && action.meta.arg && typeof action.meta.arg === "object"
        && "endpointName" in action.meta.arg && action.meta.arg.endpointName
    ));
}

const apiResponseCodeMiddleware: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => next => async action => {
    if (isApiSliceAction(action) && isApiSliceActionCompletedWithError(action)) {
        let appSnackBar: AppSnackbarInterface;
        const payload = action.payload;
        if (isResponseStatusPayload(payload)) {
            appSnackBar = {
                code: payload.code,
                date: payload.data.date,
                alertType: AppConstants.SNACKBAR_SEVERITY_TYPE.E,
                message: payload.message ? payload.message : "Unknown Error."
            };
        } else {
            const p = getProjectCodeByAction(action);
            const {data: messageDate} = await api.dispatch(messageSlice.endpoints.getMessage.initiate({
                p,
                c: payload.code
            })).unwrap();
            const alertType = AppConstants.SNACKBAR_SEVERITY_TYPE[messageDate.type as keyof typeof AppConstants.SNACKBAR_SEVERITY_TYPE];
            appSnackBar = {
                code: payload.code,
                date: new Date().getTime(),
                alertType: alertType,
                message: messageDate.description
            };
        }
        api.dispatch(add(appSnackBar));
    }

    return next(action);
}

export {apiResponseCodeMiddleware}

