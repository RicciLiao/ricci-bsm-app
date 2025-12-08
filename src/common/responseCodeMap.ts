import {ResponseCode} from "@interfaces/api/x/response/code/ResponseCode";
import {responseCodeEnum} from "@common/responseCodeEnum.ts";

const responseCodeMap: Record<responseCodeEnum, ResponseCode> = {
    [responseCodeEnum.SUCCESS]: {id: "0000", message: "", messageId: 0},
    [responseCodeEnum.SECURITY_ERROR]: {id: "1000", message: "", messageId: 0},
    [responseCodeEnum.PARAMETER_ERROR]: {id: "2000", message: "", messageId: 0},
    [responseCodeEnum.CONCURRENT_ERROR]: {id: "3000", message: "", messageId: 0},
    [responseCodeEnum.REST_ERROR]: {id: "4000", message: "", messageId: 0},
    [responseCodeEnum.DATA_ERROR]: {id: "5000", message: "", messageId: 0},
    [responseCodeEnum.UNEXPECTED_ERROR]: {id: "9000", message: "", messageId: 0},
    [responseCodeEnum.BROKEN_HTTP]: {id: "-1", message: "", messageId: 0},
}


export {responseCodeMap}