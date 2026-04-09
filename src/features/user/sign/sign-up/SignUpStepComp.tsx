import {Box, styled} from "@mui/material";
import React from "react";

/** Matches MUI `Button` / `LoadingButton` root ref when rendered as `<button>` (no `href`). */
type SignUpStepSubmitButtonRef = React.ComponentRef<typeof import("@mui/material/Button").default>;

type SignUpStepComp = React.FunctionComponent<{ submitStep: SignUpStepCompProps }>;

interface SignUpStepCompProps {
    submitButtonRef: React.RefObject<SignUpStepSubmitButtonRef | null>,
    loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    submitResultRef: React.RefObject<boolean | null>,
    emailRef: React.RefObject<string | null>,
    verificationRef: React.RefObject<string | null>,
}

interface SignUpStepInterface {
    code: string,
    description: string,
    seq: number,
    component: SignUpStepComp,
    optional: boolean,
}

const StepBox = styled(Box)(() => ({
    height: "100%",
    padding: "20px",
}));

export {
    type SignUpStepComp,
    type SignUpStepInterface,
    StepBox,
    type SignUpStepCompProps,
    type SignUpStepSubmitButtonRef,
}