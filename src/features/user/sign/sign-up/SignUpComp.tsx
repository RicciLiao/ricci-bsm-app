import {appConstants} from "@common/appConstants.ts";
import {SignUpStepCompProps, SignUpStepInterface, SignUpStepSubmitButtonRef, StepBox,} from '@features/user/sign/sign-up/SignUpStepComp.tsx';
import {SignComp} from "@features/user/sign/SignComp.tsx";
import {LoadingButton} from "@mui/lab";
import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import {useRef, useState} from "react";

const SignUpComp = () => {
    const [activeStep, setActiveStep] = useState<SignUpStepInterface>(appConstants.SIGN_UP_STEP[0]);
    const [skipStepSet, setSkipStepSet] = useState<Set<SignUpStepInterface>>(new Set<SignUpStepInterface>());
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const submitButtonRef = useRef<SignUpStepSubmitButtonRef | null>(null);
    const submitResultRef = useRef<boolean | null>(null);
    const emailRef = useRef<string | null>(null);
    const verificationRef = useRef<string | null>(null);
    const submitStep: SignUpStepCompProps = {
        submitButtonRef: submitButtonRef,
        loadingState: [loadingState, setLoadingState],
        submitResultRef: submitResultRef,
        emailRef: emailRef,
        verificationRef: verificationRef,
    };

    const handleNext = async () => {
        submitButtonRef.current?.click();
        await new Promise<void>((resolve) => {
            const stepSubmitResultChecker = setInterval(() => {
                if (submitResultRef.current != null) {
                    clearInterval(stepSubmitResultChecker);
                    resolve();
                }
            });
        });
        if (submitResultRef.current) {
            const nextIndex = appConstants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1;
            if (nextIndex < appConstants.SIGN_UP_STEP.length) {
                setActiveStep(appConstants.SIGN_UP_STEP[nextIndex]);
            }
        }
        submitResultRef.current = null;
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
                               size={"large"} loading={loadingState}>
                    {`Next >`}
                </LoadingButton>
            </Box>
        </SignComp>
    );
};

export {SignUpComp};