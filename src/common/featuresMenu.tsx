import {SignInComp} from "@features/user/sign/sign-in/SignInComp.tsx";
import {SignUpComp} from "@features/user/sign/sign-up/SignUpComp.tsx";
import {AppMenuItem} from "x-common-components-app";

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
            },
            {
                key: "index",
                label: "Index",
                sort: 2,
                subMenuList: [
                    {
                        key: "entry",
                        path: "/index/entry/tree",
                        label: "Entry Index",
                        sort: 0,
                    },
                ]
            },
        ]
    }
;


export {featuresMenu};