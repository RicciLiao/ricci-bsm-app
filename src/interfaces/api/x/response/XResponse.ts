import {ResponseCode} from "@interfaces/api/x/response/code/ResponseCode.ts";
import {ResponseData} from "@interfaces/api/x/response/data/ResponseData.ts";

interface XResponse<T extends ResponseData> {
    code: ResponseCode,
    data: T,
    rtkRequestId?: string,
}


export {
    type XResponse,
}
