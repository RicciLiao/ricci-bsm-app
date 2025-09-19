import {ResponseCode} from "../interfaces/api/x/response/code/ResponseCode";
import {ResponseCodeEnum} from "./ResponseCodeEnum";

const ResponseCodeMap: Record<ResponseCodeEnum, ResponseCode> = {
    [ResponseCodeEnum.SUCCESS]: {id: "0000", message: "", messageId: 0},
    [ResponseCodeEnum.SECURITY_ERROR]: {id: "1000", message: "", messageId: 0},
    [ResponseCodeEnum.PARAMETER_ERROR]: {id: "2000", message: "", messageId: 0},
    [ResponseCodeEnum.CONCURRENT_ERROR]: {id: "3000", message: "", messageId: 0},
    [ResponseCodeEnum.REST_ERROR]: {id: "4000", message: "", messageId: 0},
    [ResponseCodeEnum.DATA_ERROR]: {id: "5000", message: "", messageId: 0},
    [ResponseCodeEnum.UNEXPECTED_ERROR]: {id: "9000", message: "", messageId: 0},
    [ResponseCodeEnum.BROKEN_HTTP]: {id: "-1", message: "", messageId: 0},
}


export {ResponseCodeMap}