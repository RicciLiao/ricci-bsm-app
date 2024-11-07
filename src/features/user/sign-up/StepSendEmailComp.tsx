import {useAppSelector} from "../../../app/hooks.ts";
import * as React from "react";
import {Checkbox, FormControlLabel, FormGroup, Grid2, TextField} from "@mui/material";
import {AppCaptcha} from "../../../components/AppCaptcha.tsx";
import {LoadingButton} from "@mui/lab";
import {FormBox, SignUpStepComp, SignUpStepCompProps} from "./SignUpStepComp.tsx";
import {useSignUpSendPostMutation} from "../userSlice.ts";
import {apiSlice} from "../../../app/api/apiSlice.ts";

interface SignUpFormFields extends HTMLFormControlsCollection {
    userEmail: HTMLInputElement,
    captcha: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

export const StepSendEmailComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const [sendPost, {isLoading}] = useSignUpSendPostMutation();
    const {data: captcha} = useAppSelector(apiSlice.endpoints?.captcha.select());

    const handleSubmit = (e: React.FormEvent<SignUpFormElements>) => {
        e.preventDefault();
        submitStep.stepIsLoadingState[1](true);

        const {elements} = e.currentTarget;
        const emailAddress = elements.userEmail.value;
        const captchaCode = elements.captcha.value;

        sendPost({k: captcha ? captcha.data.k : "", c: captchaCode, emailAddress})
            .unwrap()
            .then((result) => {
                submitStep.stepIsLoadingState[1](false);
                // @ts-ignore
                submitStep.stepSubmitResult.current = result.data.result;
            })
            .catch((error) => {
                submitStep.stepIsLoadingState[1](false);
                submitStep.stepSubmitResult.current = false;
                console.log(error);
            })

    }

    return (
        <FormBox onSubmit={handleSubmit}>
            <TextField required label="Email" variant="filled" name="userEmail"
                       helperText="will use this email address for registration." fullWidth/>
            <Grid2 container spacing={1}>
                <Grid2 size={6}>
                    <TextField label="Captcha Code"
                               id={"captcha"} name={"captcha"} variant={"filled"}
                               required/>
                </Grid2>
                <Grid2 size={6} sx={{alignContent: 'center', alignItems: 'center'}}>
                    <AppCaptcha/>
                </Grid2>
            </Grid2>
            <LoadingButton type={'submit'} sx={{width: '80px', margin: '0 auto'}}
                           size={"large"} loading={isLoading} ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
            <FormGroup>
                <FormControlLabel required control={<Checkbox/>}
                                  label="I have read and agree to the following:"
                                  sx={{'& .MuiFormControlLabel-label': {fontSize: '0.8rem'}}}/>
            </FormGroup>
        </FormBox>
    );
}