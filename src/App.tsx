import "./App.css"
import {AppThemeProvider} from "@/components/AppThemeProvider.tsx";
import {AppHeader} from "@/components/menu/AppHeader.tsx";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {type RootState} from "@app/store.ts";
import {appTheme} from "@theme/appTheme.ts";
import {Outlet} from "react-router-dom";
import {AppSnackbarProvider as XAppSnackbarProvider} from "x-common-components-app";

const App = () => {

    return (<AppSection/>);
}

const selectCurrentSnackbar = (state: RootState) => state.appSnackbar;

const AppSection = () => {
    const dispatch = useAppDispatch();
    const snackbarState = useAppSelector(selectCurrentSnackbar);

    return (
        <AppThemeProvider theme={appTheme}>
            <XAppSnackbarProvider snackbarState={snackbarState} dispatch={dispatch}>
                <AppHeader/>
                <Outlet/>
            </XAppSnackbarProvider>
        </AppThemeProvider>
    );
};


export default App
