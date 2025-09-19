import {StepSendEmailComp} from "../features/user/sign-up/StepSendEmailComp.tsx";
import {StepVerifyEmailComp} from "../features/user/sign-up/StepVerifyEmailComp.tsx";
import {SignUpStepInterface} from "../features/user/sign-up/SignUpStepComp.tsx";
import {StepCompleteComp} from "../features/user/sign-up/StepCompleteComp";

const AppConstants = {
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_GET: "GET",
    SIGN_UP_STEP: [
        {code: 'a', description: 'Input your email', seq: 0, component: StepSendEmailComp, optional: true,},
        {code: 'b', description: 'Verify your email', seq: 1, component: StepVerifyEmailComp, optional: true,},
        {code: 'c', description: 'Complete your information', seq: 2, component: StepCompleteComp, optional: true,},
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

