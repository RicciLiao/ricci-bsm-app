import {ResponseData} from "./data/ResponseData";
import {ResponseCode} from "./code/ResponseCode";

interface XResponse<T extends ResponseData> {
    code: ResponseCode,
    data: T,
    rtkRequestId?: string,
}


export {
    type XResponse,
}
