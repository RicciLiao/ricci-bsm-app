import {useSignInMutation} from "@app/slice/api/bsmSlice.ts";
import {appTips} from "@common/appTips.ts";
import {FormBox, SignComp} from "@features/user/sign/SignComp.tsx";
import {AppTextFieldTips} from "@interfaces/AppTextFieldTips.ts";
import {LoadingButton} from "@mui/lab";
import {TextField} from "@mui/material";
import {useState} from "react";

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
            tip: appTips.USER_SIGN_UP_COMPLETE_001
        },
        userPassword: {
            error: false,
            tip: appTips.USER_SIGN_UP_COMPLETE_002
        },
    });
    const [signIn, {data, isLoading}] = useSignInMutation();
    const handleSubmit = (e: React.SubmitEvent<SignInFormElements>) => {
        e.preventDefault();



    }

    return (
        <SignComp>
            <h2>Sign Up</h2>
            <FormBox onSubmit={handleSubmit}>
                <TextField required label="Login Name" variant="standard" name="loginName" fullWidth
                           helperText={tips.loginName.tip}
                           error={tips.loginName.error}
                           onBlur={e => loginNameCheck(e, setTips)}
                           color={"error"}
                           defaultValue={test.loginName}
                />
                <TextField required label="Password" variant="standard" name="userPassword" fullWidth type="password"
                           helperText={tips.userPassword.tip}
                           error={tips.userPassword.error}
                           onBlur={e => passwordCheck(e, setTips)}
                           defaultValue={test.password}
                />
                <LoadingButton type={"submit"} sx={{width: "80px", float: "right"}}
                               size={"large"} loading={isLoading}>
                    {`Next >`}
                </LoadingButton>
            </FormBox>
        </SignComp>
    );
}

export {SignInComp}
