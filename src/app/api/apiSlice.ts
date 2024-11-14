import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react";
import {
    ResponseDataInterface,
    ResponseInterface,
    ResponseStatusInterface
} from "../../interfaces/api/response/ResponseInterface.ts";
import {isPlainObject, PayloadAction} from "@reduxjs/toolkit";

interface ApiBaseRequestInit extends RequestInit {
    url: string;
    signal: AbortSignal;
    timeout?: number,
    abortController: AbortController;
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

            return {error: errorResponse(response.status, "Unknown Error.")};
        }
        const data = await response.json();

        return {data};
    } catch (error) {

        return {error: errorResponse(timeout ? "TIME_OUT" : "FETCH_ERROR", "Unknown Error.")};
    } finally {
        clearTimeout(timeoutId)
        arg.abortController.signal.removeEventListener("abort", arg.abortController.abort);
    }
}

const apiBaseQuery: BaseQueryFn<
    ApiBaseRequestInit,
    ResponseInterface<ResponseDataInterface>,
    ResponseInterface<ResponseStatusInterface>
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

const errorResponse = (status: any, message: string): ResponseInterface<ResponseStatusInterface> => {

    return {
        data: {
            status,
            date: new Date().getTime()
        },
        message,
        code: -1
    }
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

type ApiPayloadAction = PayloadAction<ResponseInterface<ResponseDataInterface>, string, any, any>;

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api) => {

        return apiBaseQuery(args, api, {});
    },
    endpoints: () => ({})
});

export {type ApiPayloadAction, apiSlice};

