import {XResponseDataInterface} from "./x/response/XResponse";

interface Captcha extends XResponseDataInterface {
    k: string,
    i: string,
    t: number,
}

export {type Captcha};