import {AppBar, Box, Button, ButtonGroup, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {custom, selectCurrentCss} from "@/features/appThemeSlice.ts";
import {apiSlice} from "@app/api/apiSlice";

const AppHeader = () => {

    const appTheme = useAppSelector(selectCurrentCss);
    const dispatch = useAppDispatch();

    const changeStyle = () => {
        dispatch(custom(!appTheme));
    }
    const resetApiState = () => {
        dispatch(apiSlice.util.resetApiState());
    }

    const theme = createTheme({
        palette: {
            on: {
                main: "#00ff00",
            },
            off: {
                main: "#aaaaaa",
            },
        },
    });

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
                    <ThemeProvider theme={theme}>
                        <ButtonGroup variant="text">
                            <Button variant={"text"} onClick={changeStyle} color={appTheme ? "on" : "off"}>
                                Custom Style
                            </Button>
                            <Button variant={"text"} onClick={resetApiState} color={"warning"}>Clean All API State</Button>
                            <Button>Three</Button>
                        </ButtonGroup>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export {AppHeader};