import {Card} from "@mui/material";
import React from "react";
import {signTheme} from "@theme/signTheme.ts";
import {AppThemeProvider} from "@/components/AppThemeProvider.tsx";

const SignComp = ({children}: { children: React.ReactNode }) => {

    return (
        <AppThemeProvider theme={signTheme}>
            <Card sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                maxWidth: "450px",
                height: "100%",
                padding: "20px",
                boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
            }} variant="outlined">
                {children}
            </Card>
        </AppThemeProvider>
    );
}


export {SignComp}