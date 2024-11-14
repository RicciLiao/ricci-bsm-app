import {ResponseInterface} from "../../interfaces/api/response/ResponseInterface.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {apiSlice} from "./apiSlice.ts";
import {GetMessageInterface} from "../../interfaces/api/request/GetMessageInterface.ts";
import {MessageCodeInterface} from "../../interfaces/api/MessageCodeInterface.ts";

const messageSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessage: builder.query<ResponseInterface<MessageCodeInterface>, GetMessageInterface>({
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
