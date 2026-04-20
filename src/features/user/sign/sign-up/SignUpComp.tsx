import {appConstants} from "@common/appConstants.ts";
import {SignUpStepCompProps, SignUpStepInterface, SignUpStepSubmitButtonRef, StepBox,} from '@features/user/sign/sign-up/SignUpStepComp.tsx';
import {CompletedComp} from "@features/user/sign/sign-up/step/CompletedComp.tsx";
import {SignComp} from "@features/user/sign/SignComp.tsx";
import {LoadingButton} from "@mui/lab";
import {Box, Step, StepLabel, Stepper} from "@mui/material";
import {useRef, useState} from "react";

const SignUpComp = () => {


    const [activeStep, setActiveStep] = useState<SignUpStepInterface>(appConstants.SIGN_UP_STEP[0]);
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const submitButtonRef = useRef<SignUpStepSubmitButtonRef | null>(null);
    const submitResultRef = useRef<boolean | null>(null);
    const emailRef = useRef<string | null>(null);
    const verificationRef = useRef<string | null>(null);
    const avatarSrcRef = useRef<string | null>(null);
    const userNameRef = useRef<string | null>(null);

    const submitStep: SignUpStepCompProps = {
        submitButtonRef: submitButtonRef,
        loadingState: [loadingState, setLoadingState],
        submitResultRef: submitResultRef,
        emailRef: emailRef,
        verificationRef: verificationRef,
        avatarSrcRef: avatarSrcRef,
        userNameRef: userNameRef,
    };
    const [allStepCompleted, setAllStepCompleted] = useState<boolean>(false);

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
            } else {
                setAllStepCompleted(true);
            }
        }
        submitResultRef.current = null;
    }

    return (
        <SignComp>
            <h2>Sign Up</h2>
            <Stepper activeStep={allStepCompleted ? activeStep.seq + 1 : activeStep.seq} alternativeLabel>
                {appConstants.SIGN_UP_STEP.map(step => {

                    return (
                        <Step key={step.code}>
                            <StepLabel>
                                {step.description}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <StepBox>
                {allStepCompleted ? (<CompletedComp submitStep={submitStep}/>) : (<activeStep.component submitStep={submitStep}/>)}
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