import "./App.css"
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {type RootState} from "@app/store.ts";
import {featuresMenu} from "@common/featuresMenu.tsx";
import {Stack} from "@mui/material";
import {Outlet} from "react-router-dom";
import {AppHeader, AppSnackbarProvider, appTheme, AppThemeProvider} from "x-common-components-app";

const App = () => {

    return (<AppSection/>);
}

const selectCurrentSnackbar = (state: RootState) => state.appSnackbar;

const AppSection = () => {
    const dispatch = useAppDispatch();
    const snackbarState = useAppSelector(selectCurrentSnackbar);

    return (
        <AppThemeProvider theme={appTheme}>
            <AppSnackbarProvider snackbarState={snackbarState} dispatch={dispatch}>
                <Stack sx={{height: "64px", position: "absolute", width: "100vw", top: 0, left: 0, right: 0}}>
                    <AppHeader menus={[featuresMenu]}/>
                </Stack>
                <Stack alignItems={"center"} justifyContent={"center"} sx={{height: "calc(100vh - 64px)", position: "absolute", top: "64px", left: "0px", right: "0px", bottom: "0px"}}>
                    <Outlet/>
                </Stack>
            </AppSnackbarProvider>
        </AppThemeProvider>
    );
};


export default App
