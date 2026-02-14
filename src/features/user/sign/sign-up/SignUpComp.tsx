import {useRef, useState} from "react";
import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {appConstants} from "@common/appConstants.ts";
import {SignUpStepCompProps, SignUpStepInterface, StepBox} from '@features/user/sign/sign-up/SignUpStepComp.tsx';
import {SignComp} from "@features/user/sign/SignComp.tsx";

const SignUpComp = () => {
    const [activeStep, setActiveStep] = useState<SignUpStepInterface>(appConstants.SIGN_UP_STEP[0]);
    const [skipStepSet, setSkipStepSet] = useState<Set<SignUpStepInterface>>(new Set<SignUpStepInterface>());
    const [stepIsLoadingState, setStepIsLoadingState] = useState<boolean>(false);
    const submitStep: SignUpStepCompProps = {
        stepSubmitRef: useRef<HTMLAnchorElement | null>(null),
        stepIsLoadingState: [stepIsLoadingState, setStepIsLoadingState],
        stepSubmitResult: useRef<boolean>(null),
        stepEmail: useRef<string>(null),
        stepVerification: useRef<string>(null),
    }

    const handleNext = async () => {
        submitStep.stepSubmitRef.current?.click();
        await new Promise<void>((resolve) => {
            const stepSubmitResultChecker = setInterval(() => {
                if (submitStep.stepSubmitResult.current != null) {
                    clearInterval(stepSubmitResultChecker);
                    resolve();
                }
            });
        });
        if (submitStep.stepSubmitResult.current) {
            const nextIndex = appConstants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1;
            if (nextIndex < appConstants.SIGN_UP_STEP.length) {
                setActiveStep(appConstants.SIGN_UP_STEP[nextIndex]);
            }
        }
        submitStep.stepSubmitResult.current = null;
    }
    const handleSkip = async () => {
        setActiveStep(appConstants.SIGN_UP_STEP[appConstants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1]);
        setSkipStepSet((prevState) => {
            const newSet = new Set<SignUpStepInterface>(prevState);
            newSet.add(activeStep);

            return newSet;
        });
    }

    return (
        <SignComp>
            <Box>
                {activeStep.optional && (
                    <Button sx={{float: "right"}} size={"small"} onClick={handleSkip}>
                        Skip
                    </Button>
                )}
            </Box>
            <h2>Sign Up</h2>
            <Stepper activeStep={activeStep.seq} alternativeLabel>
                {appConstants.SIGN_UP_STEP.map(step => {
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
                <activeStep.component submitStep={submitStep}/>
            </StepBox>
            <Box>
                <LoadingButton type={"submit"} sx={{width: "80px", float: "right"}}
                               onClick={handleNext} color={"secondary"}
                               size={"large"} loading={submitStep.stepIsLoadingState[0]}>
                    {`Next >`}
                </LoadingButton>
            </Box>
        </SignComp>
    );
};

export {SignUpComp};