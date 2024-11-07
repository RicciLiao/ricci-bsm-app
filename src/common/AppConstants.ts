import {StepSendEmailComp} from "../features/user/sign-up/StepSendEmailComp.tsx";
import {StepVerifyEmailComp} from "../features/user/sign-up/StepVerifyEmailComp.tsx";
import {SignUpStepInterface} from "../features/user/sign-up/SignUpStepComp.tsx";

export const AppConstants = {
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_GET: "GET",
    SIGN_UP_STEP: [
        {code: 'a', description: 'Input your email', seq: 0, component: StepSendEmailComp, optional: true,},
        {code: 'b', description: 'Verify your email', seq: 1, component: StepVerifyEmailComp, optional: false,},
        {code: 'c', description: 'Complete your information', seq: 2, component: null, optional: true,},
    ] as SignUpStepInterface[],
    SNACKBAR_SEVERITY_TYPE: {
        success: "success",
        info: "info",
        warning: "warning",
        error: "error",
    }
} as const;

