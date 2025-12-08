import {AppBar, Box, Button, ButtonGroup, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {custom, selectCurrentTheme} from "@features/appThemeSlice.ts";
import {apiSlice} from "@app/api/apiSlice";
import {AppMenu} from "@/components/menu/AppMenu.tsx";
import {AppThemeProvider} from "@/components/AppThemeProvider.tsx";
import {appHeaderTheme} from "@theme/appHeaderTheme.ts";

const AppHeader = () => {

    const currentTheme = useAppSelector(selectCurrentTheme);
    const dispatch = useAppDispatch();

    const changeStyle = () => {
        dispatch(custom(!currentTheme));
    }
    const resetApiState = () => {
        dispatch(apiSlice.util.resetApiState());
    }

    return (
        <AppThemeProvider theme={appHeaderTheme} focus={true}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <AppMenu/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
                        <ButtonGroup variant="text">
                            <Button variant={"text"} onClick={changeStyle} color={currentTheme ? "on" : "off"}>
                                Custom Style
                            </Button>
                            <Button variant={"text"} onClick={resetApiState} color={"warning"}>Clean All API State</Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </Box>
        </AppThemeProvider>
    );
};

export {AppHeader};