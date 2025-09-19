import {XResponse} from "../../interfaces/api/x/response/XResponse.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {apiSlice} from "./apiSlice.ts";
import {VerifyCaptcha} from "../../interfaces/api/VerifyCaptcha";
import {Captcha} from "../../interfaces/api/Captcha";
import {Blank, Bool, Str} from "../../interfaces/api/x/response/data/SimpleData";
import {BsmUserInfo} from "../../interfaces/api/BsmUserInfo";

const bsmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<XResponse<Str>, VerifyCaptcha>({
            query: arg => ({
                url: "/bsm/user/signUp/sendPost",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        captcha: builder.query<XResponse<Captcha>, void>({
            query: () => ({
                url: "/bsm/captcha",
                method: AppConstants.HTTP_METHOD_GET
            }),
        }),
        verifyCache: builder.mutation<XResponse<Bool>, VerifyCaptcha>({
            query: (arg) => ({
                url: "/bsm/captcha",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        signUp: builder.mutation<XResponse<Blank>, BsmUserInfo & { k: string }>({
            query: ({k, ...body}) => ({
                url: `/bsm/user/signUp?k=${k}`,
                method: AppConstants.HTTP_METHOD_POST,
                body: body,
            }),
        }),
    })
})

export const {
    useSignUpSendPostMutation,
    useCaptchaQuery,
    useLazyCaptchaQuery,
    useVerifyCacheMutation,
    useSignUpMutation,
} = bsmSlice;

export {bsmSlice};