import {ResponseDataInterface} from "./ResponseDataInterface.ts";

export interface CaptchaInterface extends ResponseDataInterface {
    k: string,
    i: string,
    t: number,
}