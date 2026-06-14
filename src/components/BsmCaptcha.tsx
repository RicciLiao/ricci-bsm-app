import {bsmSlice} from "@app/slice/api/bsmSlice.ts";
import {AppCaptcha} from "x-common-components-app";

const BsmCaptcha = () => {

    return <AppCaptcha useLazyCaptchaQuery={() => bsmSlice.endpoints.captcha.useLazyQuery()}/>;
};

export {BsmCaptcha};