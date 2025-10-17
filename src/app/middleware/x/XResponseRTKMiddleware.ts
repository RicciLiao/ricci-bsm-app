import {AbstractXResponseMiddleware} from "./AbstractXResponseMiddleware";
import {isFulfilled, MiddlewareAPI} from "@reduxjs/toolkit";
import {XResponse} from "@interfaces/api/x/response/XResponse.ts";
import {ResponseData} from "@interfaces/api/x/response/data/ResponseData.ts";
import {ApiPayloadAction} from "@app/api/apiSlice";

class XResponseRTKMiddleware extends AbstractXResponseMiddleware {

    do(action: ApiPayloadAction, _api: MiddlewareAPI): void {
        if (isFulfilled(action)) {
            const payload: XResponse<ResponseData> = action.payload;
            payload.rtkRequestId = action.meta.requestId
        }
    }

}

export {
    XResponseRTKMiddleware,
}