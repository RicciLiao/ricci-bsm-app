import {useRef, useState} from "react";
import {Box, Button, Card, Step, StepLabel, Stepper} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {AppConstants} from "../../../common/AppConstants.ts";
import {SignUpStepCompProps, SignUpStepInterface, StepBox} from "./SignUpStepComp.tsx";

const SignUpComp = () => {
    const [activeStep, setActiveStep] = useState<SignUpStepInterface>(AppConstants.SIGN_UP_STEP[0]);
    const [skipStepSet, setSkipStepSet] = useState<Set<SignUpStepInterface>>(new Set<SignUpStepInterface>());
    const [stepIsLoadingState, setStepIsLoadingState] = useState<boolean>(false);
    const submitStep: SignUpStepCompProps = {
        stepSubmitRef: useRef<HTMLAnchorElement | null>(null),
        stepIsLoadingState: [stepIsLoadingState, setStepIsLoadingState],
        stepSubmitResult: useRef<boolean>(false),
    }

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
            const nextIndex = AppConstants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1;
            if (nextIndex < AppConstants.SIGN_UP_STEP.length) {
                setActiveStep(AppConstants.SIGN_UP_STEP[nextIndex]);
            }
        }
    }
    const handleSkip = async () => {
        /*setActiveStep(AppConstants.SIGN_UP_STEP[AppConstants.SIGN_UP_STEP.findIndex(step => step === activeStep) + 1]);
        setSkipStepSet((prevState) => {
            const newSet = new Set<SignUpStepInterface>(prevState);
            newSet.add(activeStep);

            return newSet;
        });*/
        myPromise().then(
            function (data) {
                console.log(data);
            }
        );
        console.log("after myPromise!");
    }

    const myPromise = () => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                const data = "i am data!";
                resolve(data);
            }, 2000)
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
                {AppConstants.SIGN_UP_STEP.map(step => {
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
                <LoadingButton type={'submit'} sx={{width: '80px', float: 'right'}}
                               onClick={handleNext}
                               size={"large"} loading={submitStep.stepIsLoadingState[0]}>
                    {`Next >`}
                </LoadingButton>
            </Box>
        </Card>
    );
};

export {SignUpComp};