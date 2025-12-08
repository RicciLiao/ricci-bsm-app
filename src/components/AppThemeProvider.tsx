import {Theme, ThemeProvider} from "@mui/material";
import {ThemeProviderProps} from "@mui/material/styles/ThemeProvider";
import {useAppSelector} from "@app/hooks.ts";
import {selectCurrentTheme} from "@features/appThemeSlice.ts";
import React from "react";
import {defaultTheme} from "@theme/appTheme.ts";

const AppThemeProvider = ({children, theme, focus, ...props}: { children?: React.ReactNode, theme: Theme, focus?: boolean, props?: ThemeProviderProps<Theme> }) => {
    const appThemeStatus = useAppSelector(selectCurrentTheme);
    let activeTheme = appThemeStatus ? theme : defaultTheme;
    activeTheme = focus ? theme : activeTheme;

    return (
        <ThemeProvider theme={activeTheme} {...props}>
            {children}
        </ThemeProvider>
    )
}


export {AppThemeProvider};