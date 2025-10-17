import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import React from "react";
import {usePreSignUpMutation} from "@app/api/bsmSlice.ts";
import {ResponseCodeEnum} from "@common/ResponseCodeEnum.ts";
import {AppTips} from "@common/AppTips.ts";
import {FormBox, SignUpStepComp, SignUpStepCompProps} from "@/features/user/sign-up/SignUpStepComp.tsx";

interface SignUpFormFields extends HTMLFormControlsCollection {
    captcha: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

const VerifyEmailComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {

    const [verify, {isLoading}] = usePreSignUpMutation();

    const handleSubmit = (e: React.FormEvent<SignUpFormElements>) => {
        e.preventDefault();
        submitStep.stepIsLoadingState[1](true);

        const {elements} = e.currentTarget;
        const emailAddress = submitStep.stepEmail.current;
        const captchaCode = elements.captcha.value;
        if (emailAddress) {
            verify({k: submitStep.stepVerification.current ?? '', c: captchaCode, emailAddress})
                .unwrap()
                .then((result) => {
                    submitStep.stepSubmitResult.current = result.code.id === ResponseCodeEnum.SUCCESS;
                    submitStep.stepVerification.current = result.data.result;
                })
                .catch(() => {
                    submitStep.stepSubmitResult.current = false;
                })
                .finally(() => {
                    submitStep.stepIsLoadingState[1](false);
                });
        }
    }

    return (
        <FormBox onSubmit={handleSubmit}>
            <TextField required label="Verification code" variant="standard" name="captcha" fullWidth
                       helperText={AppTips.USER_SIGN_UP_VERIFY_EMAIL_001}/>
            <LoadingButton type={'submit'} sx={{width: '80px', margin: '0 auto', display: 'none'}}
                           size={"large"} loading={isLoading} ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
};

export {VerifyEmailComp};