import {AbstractXResponseMiddleware, getProjectCodeByAction, isApiSliceActionCompletedWithError, isHttpErrorPayload} from "./AbstractXResponseMiddleware";
import {Dispatch, MiddlewareAPI, ThunkDispatch} from "@reduxjs/toolkit";
import {ApiPayloadAction} from "../../api/apiSlice";
import {AppSnackbar} from "../../../interfaces/AppSnackbar";
import {XResponse} from "../../../interfaces/api/x/response/XResponse";
import {ResponseData} from "../../../interfaces/api/x/response/data/ResponseData";
import {AppConstants} from "../../../common/AppConstants";
import {messageSlice} from "../../api/messageSlice";
import {Action} from "redux";
import {addSnackbar} from "../../../features/appSnackbarSlice";

export class XResponseCodeMiddleware extends AbstractXResponseMiddleware {

    async do(action: ApiPayloadAction, api: MiddlewareAPI<ThunkDispatch<any, any, Action> & Dispatch<Action>>): Promise<void> {
        if (isApiSliceActionCompletedWithError(action)) {
            let appSnackBar: AppSnackbar;
            const payload: XResponse<ResponseData> = action.payload;
            if (isHttpErrorPayload(payload)) {
                appSnackBar = {
                    code: payload.data.status,
                    date: payload.data.date,
                    alertType: AppConstants.SNACKBAR_SEVERITY_TYPE.E,
                    message: payload.data.message
                };
            } else {
                const consumer = getProjectCodeByAction(action);
                const {data: messageDate} = await api.dispatch(messageSlice.endpoints.getMessage.initiate({
                    code: payload.code.id,
                    consumer
                })).unwrap();
                const alertType = AppConstants.SNACKBAR_SEVERITY_TYPE[messageDate.level as keyof typeof AppConstants.SNACKBAR_SEVERITY_TYPE];
                appSnackBar = {
                    code: messageDate.id,
                    date: new Date().getTime(),
                    alertType: alertType,
                    message: messageDate.description
                };
            }
            api.dispatch(addSnackbar(appSnackBar));
        }
    }
}



