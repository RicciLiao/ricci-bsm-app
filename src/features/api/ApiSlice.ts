import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react";
import {ResponseInterface} from "../../interfaces/response/ResponseInterface.ts";
import {Constants} from "../../common/Constants.ts";
import {BooleanResult} from "../../interfaces/response/SimpleResponseInterface.ts";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface.ts";
import {CaptchaInterface} from "../../interfaces/response/CaptchaInterface.ts";
import {VerifyCaptchaInterface} from "../../interfaces/request/VerifyCaptchaInterface.ts";

export const apiBaseQuery: BaseQueryFn<{
    url: string;
    method: string;
    body?: any
}, ResponseInterface<ResponseDataInterface>,
    { data: ResponseInterface<ResponseDataInterface>; status: any },
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
    const errorResponse: ResponseInterface<ResponseDataInterface> = {
        data: {
            date: new Date().getMilliseconds()
        },
        message: null,
        code: -1
    }

    try {
        const response = await fetch(baseUrl + url, options);
        if (!response.ok) {

            return {error: {data: errorResponse, status: response.status}};
        }
        const data = await response.json();

        return {data};
    } catch (error) {

        return {error: {data: errorResponse, status: "FETCH_ERROR"}};
    }
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        // mock network delay
        //await new Promise((resolve) => setTimeout(resolve, 2000));

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
                method: Constants.HTTP_METHOD_POST,
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
