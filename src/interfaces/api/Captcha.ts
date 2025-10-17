import {ResponseData} from "@interfaces/api/x/response/data/ResponseData.ts";

interface Captcha extends ResponseData {
    k: string,
    i: string,
    t: number,
}

export {type Captcha};