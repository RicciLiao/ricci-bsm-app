import {AppBar, Box, FormControlLabel, FormGroup, IconButton, Switch, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {custom, selectCurrentCss} from "../features/AppThemeSlice.ts";
import React from "react";

export const AppHeader = () => {

    const appThemeStatus = useAppSelector(selectCurrentCss);
    const dispatch = useAppDispatch();

    const handleCssSwitch = (event: React.ChangeEvent) => {
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
                        <FormControlLabel control={<Switch checked={appThemeStatus} onChange={handleCssSwitch} color="error"/>}
                                          label="Custom theme"/>
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </Box>
    );
}