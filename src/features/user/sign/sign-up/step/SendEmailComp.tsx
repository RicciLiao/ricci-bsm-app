import {AppCaptcha} from "@/components/AppCaptcha";
import {useAppSelector} from "@app/hooks";
import {bsmSlice, useSignUpSendPostMutation} from "@app/slice/api/bsmSlice.ts";
import {appTips} from "@common/appTips.ts";
import {SignUpStepComp, SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {FormBox} from "@features/user/sign/SignComp.tsx";
import {LoadingButton} from "@mui/lab";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import React from "react";
import {ResponseCodeEnum} from "x-common-components-app";

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
    const {
        submitButtonRef,
        loadingState,
        submitResultRef,
        emailRef,
        verificationRef,
    } = submitStep;

    const handleSubmit = (e: React.SubmitEvent<SignUpFormElements>) => {
        e.preventDefault();
        loadingState[1](true);

        const {elements} = e.currentTarget;
        const emailAddress = elements.userEmail.value;
        const captchaCode = elements.captcha.value;

        sendPost({k: captcha ? captcha.data.k : "", c: captchaCode, emailAddress})
            .unwrap()
            .then((result) => {
                if (result.code.id.startsWith(ResponseCodeEnum.SUCCESS.id)) {
                    submitResultRef.current = true;
                    emailRef.current = emailAddress;
                    verificationRef.current = result.data.data
                } else {
                    submitResultRef.current = false;
                    emailRef.current = null;
                    verificationRef.current = null
                }
            })
            .catch(() => {
                submitResultRef.current = false;
                emailRef.current = null;
                verificationRef.current = null
            })
            .finally(() => {
                loadingState[1](false);
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
                           size={"large"} loading={isLoading} ref={submitButtonRef}>
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