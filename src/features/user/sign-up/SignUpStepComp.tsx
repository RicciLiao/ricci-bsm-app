import React from "react";
import {Box, styled} from "@mui/material";

export type SignUpStepComp = React.FunctionComponent<{ submitStep: SignUpStepCompProps }>;

export interface SignUpStepCompProps {
    stepSubmitRef: React.MutableRefObject<HTMLAnchorElement | null>,
    stepIsLoadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    stepSubmitResult: React.MutableRefObject<boolean>,
}

export interface SignUpStepInterface {
    code: string,
    description: string,
    seq: number,
    component: SignUpStepComp,
    optional: boolean,
}

export const StepBox = styled(Box)(() => ({
    height: '100%',
    padding: '20px',
}));

export const FormBox = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '20px',
}));
