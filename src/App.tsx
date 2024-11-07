import './App.css'
import {SignUpComp} from "./features/user/sign-up/SignUpComp.tsx";
import {ThemeProvider} from "@mui/material";
import {AppTheme} from "./theme/AppTheme.ts";
import {AppHeader} from "./components/AppHeader.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {AppSnackbarProvider} from "./components/AppSnackbarProvider.tsx";
import {selectCurrentCss} from "./features/appThemeSlice.ts";

function App() {

    const appThemeStatus = useAppSelector(selectCurrentCss);
    const AppSection = () => {

        return (
            <section>
                <AppSnackbarProvider/>
                <AppHeader/>
                <SignUpComp/>
            </section>
        );
    };

    if (appThemeStatus) {

        return (
            <ThemeProvider theme={AppTheme}>
                <AppSection/>
            </ThemeProvider>
        );
    }

    return (<AppSection/>);
}

export default App
