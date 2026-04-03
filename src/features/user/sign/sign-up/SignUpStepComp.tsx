import {Box, styled} from "@mui/material";
import React from "react";

type SignUpStepComp = React.FunctionComponent<{ submitStep: SignUpStepCompProps }>;

interface SignUpStepCompProps {
    stepSubmitRef: React.RefObject<HTMLAnchorElement | null>,
    stepIsLoadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    stepSubmitResult: React.RefObject<boolean | null>,
    stepEmail: React.RefObject<string | null>,
    stepVerification: React.RefObject<string | null>,
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

const FormBox = styled("form")(() => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "20px",
}));

export {type SignUpStepComp, type SignUpStepInterface, StepBox, FormBox, type SignUpStepCompProps}