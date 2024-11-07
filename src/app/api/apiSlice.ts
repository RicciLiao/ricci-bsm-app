import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react";
import {
    BooleanResult,
    ResponseDataInterface,
    ResponseErrorInterface,
    ResponseInterface
} from "../../interfaces/api/response/ResponseInterface.ts";
import {AppConstants} from "../../common/AppConstants.ts";
import {CaptchaInterface} from "../../interfaces/api/response/CaptchaInterface.ts";
import {VerifyCaptchaInterface} from "../../interfaces/api/request/VerifyCaptchaInterface.ts";

export const apiBaseQuery: BaseQueryFn<{
    url: string;
    method: string;
    body?: any
}, ResponseInterface<ResponseDataInterface>,
    ResponseInterface<ResponseErrorInterface>,
    { headers?: any }> = async (
    {url, method, body},
    _api,
    extraOptions
) => {
    const baseUrl = '/api';
    const options: RequestInit = {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            "Content-Type": "application/json",
            ...extraOptions?.headers
        }
    };
    const errorResponse: ResponseInterface<ResponseErrorInterface> = {
        data: {
            status: null,
            date: 0
        },
        message: null,
        code: -1
    }

    try {
        const response = await fetch(baseUrl + url, options);
        if (!response.ok) {
            errorResponse.data.status = response.status;
            errorResponse.data.date = new Date().getTime();

            return {error: errorResponse};
        }
        const data = await response.json();

        return {data};
    } catch (error) {
        errorResponse.data.status = "FETCH_ERROR";
        errorResponse.data.date = new Date().getTime();

        return {error: errorResponse};
    }
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {

        return apiBaseQuery(args, api, extraOptions);
    },
    endpoints: builder => ({
        captcha: builder.query<ResponseInterface<CaptchaInterface>, void>({
            query: () => ({
                url: "/captcha",
            }),
        }),
        verifyCache: builder.mutation<ResponseInterface<BooleanResult>, VerifyCaptchaInterface>({
            query: (arg) => ({
                url: "/captcha",
                method: AppConstants.HTTP_METHOD_POST,
                body: arg
            }),
        }),
    })
});

export const {
    useCaptchaQuery,
    useLazyCaptchaQuery,
    useVerifyCacheMutation,
} = apiSlice;
