import './App.css'
import {SignUpComp} from "./features/user/SignUpComp.tsx";
import {ThemeProvider} from "@mui/material";
import {AppTheme} from "./theme/AppTheme.ts";
import {AppHeader} from "./components/AppHeader.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectCurrentCss} from "./features/AppThemeSlice.ts";

function App() {

    const appThemeStatus = useAppSelector(selectCurrentCss);

    if (appThemeStatus) {

        return (
            <ThemeProvider theme={AppTheme}>
                <section>
                    <AppHeader/>
                    <SignUpComp/>
                </section>
            </ThemeProvider>
        );
    }

    return (
        <section>
            <AppHeader/>
            <SignUpComp/>
        </section>
    );
}

export default App
