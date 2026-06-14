import {Card, styled} from "@mui/material";
import {signTheme} from "@theme/signTheme.ts";
import React from "react";
import {AppThemeProvider} from "x-common-components-app";

const SignComp = ({children}: { children: React.ReactNode }) => {

    return (
        <AppThemeProvider theme={signTheme}>
            <Card sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                width: "450px",
                padding: "20px",
                boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
            }} variant="outlined">
                {children}
            </Card>
        </AppThemeProvider>
    );
}

const FormBox = styled("form")(() => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "20px",
}));


export {SignComp, FormBox}