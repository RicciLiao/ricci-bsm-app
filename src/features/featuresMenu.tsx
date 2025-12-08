import {AppMenuItem} from "@interfaces/AppMenuItem.ts";
import {SignUpComp} from "@features/user/sign/sign-up/SignUpComp.tsx";
import {SignInComp} from "@features/user/sign/sign-in/SignInComp.tsx";

const featuresMenu: AppMenuItem =
    {
        key: "Features",
        label: "Features",
        subMenuList: [
            {
                key: "sign",
                label: "Sign",
                sort: 1,
                subMenuList: [
                    {
                        key: "signIn",
                        path: "/sign/in",
                        label: "SignIn",
                        sort: 0,
                        component: SignInComp
                    },
                    {
                        key: "signUp",
                        path: "/sign/up",
                        label: "SignUp",
                        sort: 1,
                        component: SignUpComp
                    },
                ]
            }
        ]
    }
;


export {featuresMenu};