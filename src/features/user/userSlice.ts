import {ResponseEmptyDataInterface, ResponseInterface} from "../../interfaces/api/response/ResponseInterface.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {VerifyCaptchaInterface} from "../../interfaces/api/request/VerifyCaptchaInterface.ts";
import {apiSlice} from "../../app/api/apiSlice.ts";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<ResponseInterface<ResponseEmptyDataInterface>, VerifyCaptchaInterface>({
            query: arg => ({
                url: "/user/signUp/sendPost",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        })
    })
});

export const {
    useSignUpSendPostMutation,
} = userSlice;