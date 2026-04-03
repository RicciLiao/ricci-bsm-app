import {ResponseData} from "x-common-components-app";

interface Captcha extends ResponseData {
    k: string,
    i: string,
    t: number,
}

export {type Captcha};