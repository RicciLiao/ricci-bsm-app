import {Dispatch, isFulfilled, isRejectedWithValue, Middleware, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {Action} from "redux";
import {XResponse} from "@interfaces/api/x/response/XResponse.ts";
import {ResponseCodeEnum} from "@common/ResponseCodeEnum.ts";
import {ResponseData} from "@interfaces/api/x/response/data/ResponseData.ts";
import {BrokenHttp} from "@interfaces/api/x/response/data/SimpleData.ts";
import {ApiPayloadAction, apiSlice} from "@app/api/apiSlice.ts";
import {bsmSlice} from "@app/api/bsmSlice.ts";

const getProjectCodeByAction = (action: ApiPayloadAction): string => {
    if (Object.keys(bsmSlice.endpoints).find(endpointName => endpointName === action.meta.arg.endpointName)) {

        return "bsm";
    }
    isRejectedWithValue()

    return "";
}

const isHttpErrorPayload = (payload: XResponse<ResponseData>): payload is XResponse<BrokenHttp> => {

    return payload && payload.code.id === ResponseCodeEnum.BROKEN_HTTP;
}

const isApiSliceAction = (action: any): action is ApiPayloadAction => {

    return action.type.startsWith(`${apiSlice.reducerPath}/`) && isApiSliceActionWithMeta(action);
}

const isApiSliceActionCompletedWithError = (action: ApiPayloadAction): boolean => {

    return (isFulfilled(action) || isRejectedWithValue(action)) && action.payload && action.payload.code.id !== ResponseCodeEnum.SUCCESS;
}

const isApiSliceActionWithMeta = (action: ApiPayloadAction): boolean => {

    return (!!(
        "meta" in action && action.meta && typeof action.meta === "object"
        && "arg" in action.meta && action.meta.arg && typeof action.meta.arg === "object"
        && "endpointName" in action.meta.arg && action.meta.arg.endpointName
    ));
}

abstract class AbstractXResponseMiddleware<
    D extends ThunkDispatch<S, any, Action> | Dispatch<Action> = ThunkDispatch<any, any, Action> | Dispatch<Action>,
    S = any
> {
    support(action: any): action is ApiPayloadAction {

        return isApiSliceAction(action);
    }

    build(): Middleware<{}, S, D> {

        return (api: MiddlewareAPI<D, S>) => next => async action => {
            if (this.support(action)) {
                this.do(action, api);
            }

            return next(action);
        };
    };

    abstract do(action: ApiPayloadAction, api: MiddlewareAPI<D, S>): void;
}


export {
    AbstractXResponseMiddleware,
    isApiSliceActionCompletedWithError,
    isHttpErrorPayload,
    getProjectCodeByAction,
}
