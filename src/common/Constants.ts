import {SignUpStepInterface} from "../interfaces/SignUpStepInterface.ts";

export const Constants = {
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_GET: "GET",
    SIGN_UP_STEP: [
        {code: 'a', description: 'Input your email', seq: 0, optional: true,},
        {code: 'b', description: 'Verify your email', seq: 1, optional: false,},
        {code: 'c', description: 'Complete your information', seq: 2, optional: true,},
    ] as SignUpStepInterface[],

} as const;

