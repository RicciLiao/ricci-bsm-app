import {SignUpStepInterface} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {SendEmailComp} from "@features/user/sign/sign-up/step/SendEmailComp";
import {VerifyEmailComp} from "@features/user/sign/sign-up/step/VerifyEmailComp";
import {RegisterComp} from "@features/user/sign/sign-up/step/RegisterComp";
import {CompleteComp} from "@features/user/sign/sign-up/step/CompleteComp";

const appConstants = {
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_GET: "GET",
    SIGN_UP_STEP: [
        {code: "a", description: "Input Email", seq: 0, component: SendEmailComp, optional: false,},
        {code: "b", description: "Verify Email", seq: 1, component: VerifyEmailComp, optional: false,},
        {code: "c", description: "Complete Register", seq: 2, component: RegisterComp, optional: false,},
        {code: "d", description: "Complete Information", seq: 3, component: CompleteComp, optional: true,},
    ] as SignUpStepInterface[],
    SNACKBAR_SEVERITY_TYPE: {
        S: "success",
        I: "info",
        W: "warning",
        E: "error"
    },
    REGEX_ALPHA: /[A-Za-z]+/,
    REGEX_NUMERIC: /\d+/,
} as const;

export {appConstants};

