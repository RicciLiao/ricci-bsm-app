import {bsmConstants} from "@common/bsmConstants.ts";
import {Captcha} from "@interfaces/api/Captcha.ts";
import {apiSlice, XResponse} from "x-common-components-app";

const bsmSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        captcha: builder.query<XResponse<Captcha>, void>({
            query: () => ({
                url: "/bsm/captcha",
                method: bsmConstants.HTTP_METHOD_GET
            }),
        }),
    })
})

export const {
    useCaptchaQuery,
    useLazyCaptchaQuery,
} = bsmSlice;

export {bsmSlice};
