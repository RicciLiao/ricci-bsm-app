import {AppCaptcha} from "@/components/AppCaptcha";
import {useAppSelector} from "@app/hooks";
import {bsmSlice, useSignUpSendPostMutation} from "@app/slice/api/bsmSlice.ts";
import {appTips} from "@common/appTips.ts";
import {FormBox, SignUpStepComp, SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {LoadingButton} from "@mui/lab";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import React from "react";
import {responseCodeEnum} from "x-common-components-app";

interface SignUpFormFields extends HTMLFormControlsCollection {
    userEmail: HTMLInputElement,
    captcha: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

const SendEmailComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const [sendPost, {isLoading}] = useSignUpSendPostMutation();
    const {data: captcha} = useAppSelector(bsmSlice.endpoints?.captcha.select());

    const handleSubmit = (e: React.SubmitEvent<SignUpFormElements>) => {
        e.preventDefault();
        submitStep.stepIsLoadingState[1](true);

        const {elements} = e.currentTarget;
        const emailAddress = elements.userEmail.value;
        const captchaCode = elements.captcha.value;

        sendPost({k: captcha ? captcha.data.k : "", c: captchaCode, emailAddress})
            .unwrap()
            .then((result) => {
                submitStep.stepSubmitResult.current = result.code.id === responseCodeEnum.SUCCESS;
                submitStep.stepEmail.current = emailAddress;
                submitStep.stepVerification.current = result.data.result
            })
            .catch(() => {
                submitStep.stepSubmitResult.current = false;
                submitStep.stepEmail.current = "";
            })
            .finally(() => {
                submitStep.stepIsLoadingState[1](false);
            });
    }

    return (
        <FormBox onSubmit={handleSubmit}>
            <TextField required label="Email" variant="standard" name="userEmail"
                       helperText={appTips.USER_SIGN_UP_SEND_EMAIL_001} fullWidth/>
            <Grid container spacing={1}>
                <Grid size={5}>
                    <TextField label="Captcha Code"
                               id={"captcha"} name={"captcha"} variant={"standard"}
                               required/>
                </Grid>
                <Grid size={7} sx={{alignContent: "center", alignItems: "center"}}>
                    <AppCaptcha/>
                </Grid>
            </Grid>
            <LoadingButton type={"submit"} sx={{width: "80px", margin: "0 auto", display: "none"}}
                           size={"large"} loading={isLoading} ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
            <FormGroup>
                <FormControlLabel required control={<Checkbox/>}
                                  label="I have read and agree to the following:"
                                  sx={{"& .MuiFormControlLabel-label": {fontSize: "0.8rem"}}}/>
            </FormGroup>
        </FormBox>
    );
};

export {SendEmailComp};