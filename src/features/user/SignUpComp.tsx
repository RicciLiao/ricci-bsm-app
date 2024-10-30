import * as React from "react";
import {useRef, useState} from "react";
import {
    Box,
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid2,
    Step,
    StepLabel,
    Stepper,
    styled,
    TextField
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {apiSlice, useVerifyCacheMutation} from "../api/ApiSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {AppCaptcha} from "../../components/AppCaptcha.tsx";
import {Constants} from "../../common/Constants.ts";
import {SignUpStepInterface} from "../../interfaces/SignUpStepInterface.ts";

interface SignUpSubmitStep {
    stepSubmitRef: React.MutableRefObject<HTMLAnchorElement | null>,
    stepIsLoadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    stepSubmitResult: React.MutableRefObject<boolean>,
}

interface SignUpFormFields extends HTMLFormControlsCollection {
    userEmail: HTMLInputElement,
    captcha: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

const StepBox = styled(Box)(() => ({
    height: '100%',
    padding: '20px',
}));

const FormBox = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '20px',
}));

const SendEmailComp = ({submitStep}: { submitStep: SignUpSubmitStep }) => {
    const [verify, {isLoading}] = useVerifyCacheMutation();
    const {data: captcha} = useAppSelector(apiSlice.endpoints?.captcha.select());

    const handleSubmit = async (e: React.FormEvent<SignUpFormElements>) => {
        e.preventDefault();
        submitStep.stepIsLoadingState[1](true);

        const {elements} = e.currentTarget;
        const userEmail = elements.userEmail.value;
        const captchaCode = elements.captcha.value;

        const result = await verify({k: captcha ? captcha.data.k : "", c: captchaCode, userEmail}).unwrap();
        submitStep.stepIsLoadingState[1](false);
        // @ts-ignore
        submitStep.stepSubmitResult.current = result.data.result;
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

export const SignUpComp = () => {
    const [activeStep, setActiveStep] = useState<SignUpStepInterface>(Constants.SIGN_UP_STEP[0]);
    const [skipStepSet, setSkipStepSet] = useState<Set<SignUpStepInterface>>(new Set<SignUpStepInterface>());
    const submitStep: SignUpSubmitStep = {
        stepSubmitRef: useRef<HTMLAnchorElement | null>(null),
        stepIsLoadingState: useState<boolean>(false),
        stepSubmitResult: useRef<boolean>(false),
    }
    let component = () => {

        switch (activeStep) {
            case Constants.SIGN_UP_STEP[0]:
                return <SendEmailComp submitStep={submitStep}/>;
            default:
                return <></>;
        }
    };
    const handleNext = async () => {
        submitStep.stepSubmitRef.current?.click();
        await new Promise<void>((resolve) => {
            const stepSubmitResultChecker = setInterval(() => {
                if (submitStep.stepSubmitResult.current) {
                    clearInterval(stepSubmitResultChecker);
                    resolve();
                }
            });
        });
        if (submitStep.stepSubmitResult.current) {
            const nextIndex = Constants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1;
            if (nextIndex < Constants.SIGN_UP_STEP.length) {
                setActiveStep(Constants.SIGN_UP_STEP[nextIndex]);
            }
        }
    }
    const handleSkip = () => {
        setActiveStep(Constants.SIGN_UP_STEP[Constants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1]);
        setSkipStepSet((prevState) => {
            const newSet = new Set<SignUpStepInterface>(prevState);
            newSet.add(activeStep);

            return newSet;
        });
    }

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            maxWidth: '450px',
            height: '100%',
            padding: '20px',
            boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
        }} variant="outlined">
            <Box>
                {activeStep.optional && (
                    <Button sx={{float: 'right'}} size={'small'} onClick={handleSkip}>
                        Skip
                    </Button>
                )}
            </Box>
            <h2>Sign Up</h2>
            <Stepper activeStep={activeStep.seq} alternativeLabel>
                {Constants.SIGN_UP_STEP.map(step => {
                    const stepProps: { completed?: boolean } = {};
                    if (skipStepSet.has(step)) {
                        stepProps.completed = false;
                    }

                    return (
                        <Step key={step.code} {...stepProps}>
                            <StepLabel>
                                {step.description}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <StepBox>
                {component()}
            </StepBox>
            <Box>
                <LoadingButton type={'submit'} sx={{width: '80px', float: 'right'}}
                               onClick={handleNext}
                               size={"large"} loading={submitStep.stepIsLoadingState[0]}>
                    {`Next >`}
                </LoadingButton>
            </Box>
        </Card>
    );
}