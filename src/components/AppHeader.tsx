import {AppBar, Box, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import React from "react";
import {custom, selectCurrentCss} from "../features/appThemeSlice.ts";

export const AppHeader = () => {

    const appTheme = useAppSelector(selectCurrentCss);
    const dispatch = useAppDispatch();

    const handleCssSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(custom(event.target.checked));
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={appTheme} onChange={handleCssSwitch} color="error"/>}
                            label="Custom theme"/>
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </Box>
    );
}