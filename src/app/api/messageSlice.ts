import {MessageCode} from "@interfaces/api/MessageCode.ts";
import {XResponse} from "@interfaces/api/x/response/XResponse.ts";
import {GetMessage} from "@interfaces/api/GetMessage.ts";
import {apiSlice} from "@app/api/apiSlice.ts";
import {appConstants} from "@common/appConstants.ts";

const messageSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessage: builder.query<XResponse<MessageCode>, GetMessage>({
            query: arg => ({
                url: `/message/code/${arg.code}/${arg.consumer}`,
                method: appConstants.HTTP_METHOD_GET
            }),
        }),
    })
})

export const {
    useGetMessageQuery,
    useLazyGetMessageQuery,
} = messageSlice;

export {messageSlice};
