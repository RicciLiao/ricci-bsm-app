import {bsmConstants} from "@common/bsmConstants.ts";
import {BsmUserInfo} from "@interfaces/api/BsmUserInfo.ts";
import {UserPreSignUp} from "@interfaces/api/UserPreSignUp.ts";
import {UserSignIn} from "@interfaces/api/UserSignIn.ts";
import {apiSlice, Blank, Str, XResponse} from "x-common-components-app";

const bsmUserSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signUpSendPost: builder.mutation<XResponse<Str>, UserPreSignUp>({
            query: arg => ({
                url: "/bsm/user/signUp/sendPost",
                method: bsmConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        preSignUp: builder.mutation<XResponse<Str>, UserPreSignUp>({
            query: (arg) => ({
                url: "/bsm/user/signUp/pre",
                method: bsmConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
        signUp: builder.mutation<XResponse<Blank>, { formData: FormData, k: string }>({
            query: ({formData, k}) => ({
                url: `/bsm/user/signUp?k=${k}`,
                method: bsmConstants.HTTP_METHOD_POST,
                body: formData,
            }),
        }),
        signIn: builder.mutation<XResponse<BsmUserInfo>, UserSignIn>({
            query: (arg) => ({
                url: `/bsm/user/signIn`,
                method: bsmConstants.HTTP_METHOD_POST,
                body: arg,
            }),
        }),
    })
})

export const {
    useSignUpSendPostMutation,
    usePreSignUpMutation,
    useSignUpMutation,
    useSignInMutation,
} = bsmUserSlice;

export {bsmUserSlice};