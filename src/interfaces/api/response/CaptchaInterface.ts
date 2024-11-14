import {ResponseDataInterface} from "./ResponseInterface.ts";

interface CaptchaInterface extends ResponseDataInterface {
    k: string,
    i: string,
    t: number,
}

export {type CaptchaInterface};