import {Response} from "../../interfaces/api/response/Response.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {apiSlice} from "./apiSlice.ts";
import {GetMessage} from "../../interfaces/api/request/GetMessage.ts";
import {MessageCode} from "../../interfaces/api/MessageCode.ts";

const messageSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessage: builder.query<Response<MessageCode>, GetMessage>({
            query: arg => ({
                url: `/message/code/${arg.p}/${arg.c}`,
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
