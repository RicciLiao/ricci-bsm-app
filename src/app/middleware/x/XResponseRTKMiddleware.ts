import {AbstractXResponseMiddleware} from "./AbstractXResponseMiddleware";
import {isFulfilled, MiddlewareAPI} from "@reduxjs/toolkit";
import {XResponse} from "../../../interfaces/api/x/response/XResponse";
import {ResponseData} from "../../../interfaces/api/x/response/data/ResponseData";
import {ApiPayloadAction} from "../../api/apiSlice";

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