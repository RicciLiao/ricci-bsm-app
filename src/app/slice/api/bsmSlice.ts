import {appConstants} from "@common/appConstants.ts";
import {BsmUserInfo} from "@interfaces/api/BsmUserInfo.ts";
import {Captcha} from "@interfaces/api/Captcha.ts";
import {UserPreSignUp} from "@interfaces/api/UserPreSignUp.ts";
import {apiSlice, Blank, Str, XResponse} from "x-common-components-app";

const bsmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<XResponse<Str>, UserPreSignUp>({
            query: arg => ({
                url: "/bsm/user/signUp/sendPost",
                method: appConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        captcha: builder.query<XResponse<Captcha>, void>({
            query: () => ({
                url: "/bsm/captcha",
                method: appConstants.HTTP_METHOD_GET
            }),
        }),
        preSignUp: builder.mutation<XResponse<Str>, UserPreSignUp>({
            query: (arg) => ({
                url: "/bsm/user/signUp/pre",
                method: appConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        signUp: builder.mutation<XResponse<Blank>, BsmUserInfo & { k: string }>({
            query: ({k, ...body}) => ({
                url: `/bsm/user/signUp?k=${k}`,
                method: appConstants.HTTP_METHOD_POST,
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