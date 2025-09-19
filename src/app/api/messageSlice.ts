import {AppConstants} from "../../common/AppConstants.ts";
import {apiSlice} from "./apiSlice.ts";
import {MessageCode} from "../../interfaces/api/MessageCode.ts";
import {XResponse} from "../../interfaces/api/x/response/XResponse.ts";
import {GetMessage} from "../../interfaces/api/GetMessage";

const messageSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessage: builder.query<XResponse<MessageCode>, GetMessage>({
            query: arg => ({
                url: `/message/code/${arg.code}/${arg.consumer}`,
                method: AppConstants.HTTP_METHOD_GET
            }),
        }),
    })
})

export const {
    useGetMessageQuery,
    useLazyGetMessageQuery,
} = messageSlice;

export {messageSlice};
