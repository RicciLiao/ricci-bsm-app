import {AppThemeProvider} from "@/components/AppThemeProvider.tsx";
import {featuresMenu} from "@common/featuresMenu.tsx";
import {appMenuTheme} from "@theme/appMenuTheme.ts";
import {AppMenu as XAppMenu} from "x-common-components-app";

const AppMenu = () => {

    return (
        <AppThemeProvider theme={appMenuTheme}>
            <XAppMenu menus={[featuresMenu]}/>
        </AppThemeProvider>
    );
}


export {
    AppMenu
};