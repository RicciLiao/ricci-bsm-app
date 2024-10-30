import React from "react";
import {ButtonProps} from "@mui/material";


export interface DirtyCheckFormInterface {
    render: (arg0: React.ReactElement) => React.ReactElement,
    index: number,
    description: string,
    trigger: React.ReactElement<ButtonProps>,
}

