import {useSignInMutation} from "@app/slice/api/bsmSlice.ts";
import {FormBox, SignComp} from "@features/user/sign/SignComp.tsx";
import {AppTextFieldTips} from "@interfaces/AppTextFieldTips.ts";
import {LoadingButton} from "@mui/lab";
import {Box, TextField} from "@mui/material";
import {useState} from "react";
import {ResponseCodeEnum} from "x-common-components-app";

interface SignInFormFields extends HTMLFormControlsCollection {
    loginName: HTMLInputElement,
    userPassword: HTMLInputElement,
}

interface SignInFormElements extends HTMLFormElement {
    readonly elements: SignInFormFields
}

interface SignInTips {
    loginName: AppTextFieldTips,
    userPassword: AppTextFieldTips,
}


const SignInComp = () => {
    const [tips, setTips] = useState<SignInTips>({
        loginName: {
            error: false,
            tip: ""
        },
        userPassword: {
            error: false,
            tip: ""
        },
    });
    const [signIn, {isLoading}] = useSignInMutation();
    const handleSubmit = (e: React.SubmitEvent<SignInFormElements>) => {
        e.preventDefault();

        const {elements} = e.currentTarget;
        const loginName = elements.loginName.value;
        const userPassword = elements.userPassword.value;
        signIn({signInName: loginName, signInPassword: userPassword})
            .unwrap()
            .then(result => {
                if (result.code.id.startsWith(ResponseCodeEnum.SUCCESS.id)) {
                    alert("Sign in successful!");
                } else {
                    setTips({
                        loginName: {
                            error: true,
                            tip: ""
                        },
                        userPassword: {
                            error: true,
                            tip: ""
                        },
                    });
                }
            });
    }

    return (
        <SignComp>
            <h2>Sign Up</h2>
            <FormBox onSubmit={handleSubmit}>
                <TextField required label="Login Name" variant="standard" name="loginName" fullWidth
                           helperText={tips.loginName.tip}
                           error={tips.loginName.error}
                           color={"error"}
                />
                <TextField required label="Password" variant="standard" name="userPassword" fullWidth type="password"
                           helperText={tips.userPassword.tip}
                           error={tips.userPassword.error}
                />
                <Box>
                    <LoadingButton type={"submit"} sx={{width: "80px", float: "right"}} color={"secondary"}
                                   size={"large"} loading={isLoading}>
                        {`Next >`}
                    </LoadingButton>
                </Box>
            </FormBox>
        </SignComp>
    );
}

export {SignInComp}
