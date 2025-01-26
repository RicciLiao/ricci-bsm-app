import {BooleanResult, Response} from "../../interfaces/api/response/Response.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {VerifyCaptcha} from "../../interfaces/api/request/VerifyCaptcha.ts";
import {apiSlice} from "./apiSlice.ts";
import {Captcha} from "../../interfaces/api/response/Captcha.ts";

const bsmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<Response<BooleanResult>, VerifyCaptcha>({
            query: arg => ({
                url: "/bsm/user/signUp/sendPost",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        captcha: builder.query<Response<Captcha>, void>({
            query: () => ({
                url: "/bsm/captcha",
                method: AppConstants.HTTP_METHOD_GET
            }),
        }),
        verifyCache: builder.mutation<Response<BooleanResult>, VerifyCaptcha>({
            query: (arg) => ({
                url: "/bsm/captcha",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
    })
})

export const {
    useSignUpSendPostMutation,
    useCaptchaQuery,
    useLazyCaptchaQuery,
    useVerifyCacheMutation
} = bsmSlice;

export {bsmSlice};