import {usePreSignUpMutation} from "@app/slice/api/bsmSlice.ts";
import {appTips} from "@common/appTips.ts";
import {SignUpStepComp, SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {FormBox} from "@features/user/sign/SignComp.tsx";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import {LoadingButton} from "@mui/lab";
import {TextField} from "@mui/material";
import React from "react";
import {ResponseCodeEnum} from "x-common-components-app";

interface SignUpFormFields extends HTMLFormControlsCollection {
    captcha: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

const VerifyEmailComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const {
        submitButtonRef,
        loadingState,
        submitResultRef,
        emailRef,
        verificationRef,
    } = submitStep;
    const [verify, {isLoading}] = usePreSignUpMutation();

    const handleSubmit = (e: React.SubmitEvent<SignUpFormElements>) => {
        e.preventDefault();
        loadingState[1](true);

        const {elements} = e.currentTarget;
        const emailAddress = emailRef.current;
        const captchaCode = elements.captcha.value;
        if (emailAddress) {
            verify({k: verificationRef.current ?? "", c: captchaCode, emailAddress})
                .unwrap()
                .then((result) => {
                    if(result.code.id.startsWith(ResponseCodeEnum.SUCCESS.id)){
                        verificationRef.current = result.data.data;
                        submitResultRef.current = true;
                    } else {
                        submitResultRef.current = false;
                    }
                })
                .catch(() => {
                    submitResultRef.current = false;
                })
                .finally(() => {
                    loadingState[1](false);
                });
        }
    }

    return (
        <>
            <ForwardToInboxIcon sx={{fontSize: "64px"}}/>
            <FormBox onSubmit={handleSubmit}>
                <label> The email verification code has been sent to {emailRef.current}.</label>
                <TextField required label="Verification code" variant="standard" name="captcha" fullWidth
                           helperText={appTips.USER_SIGN_UP_VERIFY_EMAIL_001}/>
                <LoadingButton type={"submit"} sx={{width: "80px", margin: "0 auto", display: "none"}}
                               size={"large"} loading={isLoading} ref={submitButtonRef}>
                    {`Next >`}
                </LoadingButton>
            </FormBox>
        </>
    );
};

export {VerifyEmailComp};