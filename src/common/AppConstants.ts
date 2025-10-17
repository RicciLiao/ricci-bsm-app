import {SignUpStepInterface} from "@/features/user/sign-up/SignUpStepComp.tsx";
import {SendEmailComp} from "@/features/user/sign-up/step/SendEmailComp";
import {VerifyEmailComp} from "@/features/user/sign-up/step/VerifyEmailComp";
import {RegisterComp} from "@/features/user/sign-up/step/RegisterComp";
import {CompleteComp} from "@/features/user/sign-up/step/CompleteComp";

const AppConstants = {
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_GET: "GET",
    SIGN_UP_STEP: [
        {code: 'a', description: 'Input Email', seq: 0, component: SendEmailComp, optional: false,},
        {code: 'b', description: 'Verify Email', seq: 1, component: VerifyEmailComp, optional: false,},
        {code: 'c', description: 'Complete Register', seq: 2, component: RegisterComp, optional: false,},
        {code: 'd', description: 'Complete Information', seq: 3, component: CompleteComp, optional: true,},
    ] as SignUpStepInterface[],
    SNACKBAR_SEVERITY_TYPE: {
        S: "success",
        I: "info",
        W: "warning",
        E: "error"
    },
    REGEX_ALPHA: /[A-Za-z]+/,
    REGEX_NUMERIC: /[0-9]+/,
} as const;

export {AppConstants};

