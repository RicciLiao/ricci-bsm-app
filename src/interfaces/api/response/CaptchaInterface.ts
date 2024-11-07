import {ResponseDataInterface} from "./ResponseInterface.ts";

export interface CaptchaInterface extends ResponseDataInterface {
    k: string,
    i: string,
    t: number,
}