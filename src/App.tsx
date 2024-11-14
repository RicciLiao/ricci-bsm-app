import './App.css'
import {SignUpComp} from "./features/user/sign-up/SignUpComp.tsx";
import {ThemeProvider} from "@mui/material";
import {AppTheme} from "./theme/AppTheme.ts";
import {AppHeader} from "./components/AppHeader.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {AppSnackbarProvider} from "./components/AppSnackbarProvider.tsx";
import {selectCurrentCss} from "./features/appThemeSlice.ts";

const App = () => {

    const appThemeStatus = useAppSelector(selectCurrentCss);

    if (appThemeStatus) {

        return (
            <ThemeProvider theme={AppTheme}>
                <AppSection/>
            </ThemeProvider>
        );
    }

    return (<AppSection/>);
}

const AppSection = () => {

    return (
        <section>
            <AppSnackbarProvider/>
            <AppHeader/>
            <SignUpComp/>
        </section>
    );
};

export default App
