import {BooleanResult, ResponseInterface} from "../../interfaces/api/response/ResponseInterface.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {VerifyCaptchaInterface} from "../../interfaces/api/request/VerifyCaptchaInterface.ts";
import {apiSlice} from "./apiSlice.ts";
import {CaptchaInterface} from "../../interfaces/api/response/CaptchaInterface.ts";

const bsmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<ResponseInterface<BooleanResult>, VerifyCaptchaInterface>({
            query: arg => ({
                url: "/bsm/user/signUp/sendPost",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        captcha: builder.query<ResponseInterface<CaptchaInterface>, void>({
            query: () => ({
                url: "/bsm/captcha",
                method: AppConstants.HTTP_METHOD_GET
            }),
        }),
        verifyCache: builder.mutation<ResponseInterface<BooleanResult>, VerifyCaptchaInterface>({
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