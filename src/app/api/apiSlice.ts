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
import {isPlainObject} from "@reduxjs/toolkit";

const errorResponse = (status: any, message: string): ResponseInterface<ResponseErrorInterface> => {

    return {
        data: {
            status,
            date: new Date().getTime()
        },
        message,
        code: -1
    }
}

interface ApiBaseRequestInit extends RequestInit {
    url: string;
    signal: AbortSignal;
    timeout?: number,
    abortController: AbortController;
}

const handleHeaders = (headers: HeadersInit | undefined, body: any): Headers => {
    const result = headers ? new Headers(headers) : new Headers();

    //content-type
    if (!result.has("content-type")) {
        if (typeof body === "object" && (isPlainObject(body) || Array.isArray(body) || typeof body.toJSON === "function")) {
            result.set("content-type", "application/json");
        }
    }

    return result;
}

const handleBody = (body: any, headers: Headers): BodyInit => {
    if (body) {
        if (headers.has("content-type") && "application/json" === headers.get("content-type")) {

            return JSON.stringify(body);
        }
    }

    return body;
}

const fetchApi = async (url: string, arg: ApiBaseRequestInit) => {
    let timeout = false;
    let timeoutId = setTimeout(() => {
        timeout = true;
        arg.abortController.abort();
    }, arg.timeout);

    try {
        const response = await fetch(url, arg);
        if (!response.ok) {

            return {error: errorResponse(response.status, "1")};
        }
        const data = await response.json();

        return {data};
    } catch (error) {

        return {error: errorResponse(timeout ? "TIME_OUT" : "FETCH_ERROR", "2")};
    } finally {
        clearTimeout(timeoutId)
        arg.abortController.signal.removeEventListener("abort", arg.abortController.abort);
    }
}

export const apiBaseQuery: BaseQueryFn<
    ApiBaseRequestInit,
    ResponseInterface<ResponseDataInterface>,
    ResponseInterface<ResponseErrorInterface>
> = async (
    args,
    _api
) => {
    const baseUrl = '/api';
    const headers: Headers = handleHeaders(args.headers, args.body);
    const body: BodyInit = handleBody(args.body, headers);

    const abortController = new AbortController();
    _api.signal.addEventListener("abort", abortController.abort);

    const options: ApiBaseRequestInit = {
        ...args,
        body,
        headers,
        abortController,
        signal: abortController.signal,
        timeout: args.timeout ? args.timeout : 5000
    };

    return fetchApi(baseUrl + args.url, options)
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api) => {

        return apiBaseQuery(args, api, {});
    },
    endpoints: builder => ({
        captcha: builder.query<ResponseInterface<CaptchaInterface>, void>({
            query: () => ({
                url: "/captcha",
                method: AppConstants.HTTP_METHOD_GET,
                timeout: 3000
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
