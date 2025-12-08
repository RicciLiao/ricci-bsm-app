import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/300-italic.css";
import "@fontsource/roboto/400-italic.css";
import "@fontsource/roboto/500-italic.css";
import "@fontsource/roboto/700-italic.css";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {SignUpComp} from "@features/user/sign/sign-up/SignUpComp.tsx";
import {SignInComp} from "@features/user/sign/sign-in/SignInComp.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="sign">
                <Route path="up" element={<SignUpComp/>}/>
                <Route path="in" element={<SignInComp/>}/>
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>
)
