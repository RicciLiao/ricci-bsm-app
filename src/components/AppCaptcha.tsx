import {bsmSlice} from "@app/slice/api/bsmSlice.ts";
import {AppCaptcha as XAppCaptcha} from "x-common-components-app";

const AppCaptcha = () => {

    return <XAppCaptcha useLazyCaptchaQuery={() => bsmSlice.endpoints.captcha.useLazyQuery()}/>;
};

export {AppCaptcha};