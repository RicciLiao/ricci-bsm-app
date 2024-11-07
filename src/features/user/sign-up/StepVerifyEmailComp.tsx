import {useAppSelector} from "../../../app/hooks.ts";
import * as React from "react";
import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {FormBox, SignUpStepComp, SignUpStepCompProps} from "./SignUpStepComp.tsx";
import {apiSlice, useVerifyCacheMutation} from "../../../app/api/apiSlice.ts";

interface SignUpFormFields extends HTMLFormControlsCollection {
    userEmail: HTMLInputElement,
    captcha: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

export const StepVerifyEmailComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const [verify, {isLoading}] = useVerifyCacheMutation();
    const {data: captcha} = useAppSelector(apiSlice.endpoints?.captcha.select());

    const handleSubmit = async (e: React.FormEvent<SignUpFormElements>) => {
        e.preventDefault();
        submitStep.stepIsLoadingState[1](true);

        const {elements} = e.currentTarget;
        const emailAddress = elements.userEmail.value;
        const captchaCode = elements.captcha.value;

        const result = await verify({k: captcha ? captcha.data.k : "", c: captchaCode, emailAddress}).unwrap();
        submitStep.stepIsLoadingState[1](false);
        // @ts-ignore
        submitStep.stepSubmitResult.current = result.data.result;
    }

    return (
        <FormBox onSubmit={handleSubmit}>
            <TextField required label="Verification code" variant="filled" name="vc"
                       helperText="please check the registration email and input the verification code." fullWidth/>
            <LoadingButton type={'submit'} sx={{width: '80px', margin: '0 auto'}}
                           size={"large"} loading={isLoading} ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
}