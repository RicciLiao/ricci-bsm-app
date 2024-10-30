import {ResponseDataInterface} from "./ResponseDataInterface.ts";

export interface ResponseInterface<T extends ResponseDataInterface> {
    code: number,
    message: string | null;
    data: T,
}