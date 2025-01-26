import {ResponseDataInterface} from "./Response.ts";

interface Captcha extends ResponseDataInterface {
    k: string,
    i: string,
    t: number,
}

export {type Captcha};