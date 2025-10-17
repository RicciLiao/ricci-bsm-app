import {AppConstants} from "@common/AppConstants.ts";
import {MessageCode} from "@interfaces/api/MessageCode.ts";
import {XResponse} from "@interfaces/api/x/response/XResponse.ts";
import {GetMessage} from "@interfaces/api/GetMessage.ts";
import {apiSlice} from "@app/api/apiSlice.ts";

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
