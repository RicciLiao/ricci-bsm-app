import {ResponseData} from "./ResponseData";

interface Blank extends ResponseData {
}

interface Bool extends ResponseData {
    result: boolean,
}

interface Str extends ResponseData {
    result: string,
}

interface BrokenHttp extends ResponseData {
    status: number;
    message: string;
    date: number;
}


export {
    type Blank,
    type Bool,
    type Str,
    type BrokenHttp,
}