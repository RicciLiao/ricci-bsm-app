import {XResponse} from "@interfaces/api/x/response/XResponse.ts";
import {AppConstants} from "@common/AppConstants.ts";
import {UserPreSignUp} from "@interfaces/api/UserPreSignUp.ts";
import {Captcha} from "@interfaces/api/Captcha.ts";
import {Blank, Str} from "@interfaces/api/x/response/data/SimpleData.ts";
import {BsmUserInfo} from "@interfaces/api/BsmUserInfo.ts";
import {apiSlice} from "@app/api/apiSlice.ts";

const bsmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<XResponse<Str>, UserPreSignUp>({
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
        preSignUp: builder.mutation<XResponse<Str>, UserPreSignUp>({
            query: (arg) => ({
                url: "/bsm/user/signUp/pre",
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
    usePreSignUpMutation,
    useSignUpMutation,
} = bsmSlice;

export {bsmSlice};