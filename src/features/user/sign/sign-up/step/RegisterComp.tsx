import {useSignUpMutation} from "@app/slice/api/bsmSlice.ts";
import {appConstants} from "@common/appConstants.ts";
import {appTips} from "@common/appTips.ts";
import {SignUpStepComp, SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {FormBox} from "@features/user/sign/SignComp.tsx";
import {AppTextFieldTips} from "@interfaces/AppTextFieldTips";
import {LoadingButton} from "@mui/lab";
import {TextField} from "@mui/material";
import {produce} from "immer";
import React, {useState} from "react";
import {ResponseCodeEnum} from "x-common-components-app";

interface RegisterFormFields extends HTMLFormControlsCollection {
    loginName: HTMLInputElement,
    userPassword: HTMLInputElement,
}

interface RegisterFormElements extends HTMLFormElement {
    readonly elements: RegisterFormFields
}

interface RegisterTips {
    loginName: AppTextFieldTips,
    userPassword: AppTextFieldTips,
}

const passwordCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStatus: React.Dispatch<React.SetStateAction<RegisterTips>>,
) => {
    const password = e.target.value;
    if (!password) {
        setStatus(produce(draft => {
            draft.userPassword.error = false;
            draft.userPassword.tip = appTips.USER_SIGN_UP_COMPLETE_002;
        }));

        return;
    }
    if (password.length < 8) {
        setStatus(produce(draft => {
            draft.userPassword.error = true;
        }));

        return;
    }
    if (!appConstants.REGEX_ALPHA.test(password) || !appConstants.REGEX_NUMERIC.test(password)) {
        setStatus(produce(draft => {
            draft.userPassword.error = true;
        }));

        return;
    }
    setStatus(produce(draft => {
        draft.userPassword.error = false;
    }));
};

const loginNameCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStatus: React.Dispatch<React.SetStateAction<RegisterTips>>,
) => {
    const loginName = e.target.value;
    if (!loginName) {
        setStatus(produce(draft => {
            draft.loginName.error = false;
        }));

        return;
    }
    if (loginName.length < 8) {
        setStatus(produce(draft => {
            draft.loginName.error = true;
        }));

        return;
    }
    if (!appConstants.REGEX_ALPHA.test(loginName) || !appConstants.REGEX_NUMERIC.test(loginName)) {
        setStatus(produce(draft => {
            draft.loginName.error = true;
        }));

        return;
    }
    setStatus(produce(draft => {
        draft.loginName.error = false;
    }));
}

const RegisterComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const [tips, setTips] = useState<RegisterTips>({
        loginName: {
            error: false,
            tip: appTips.USER_SIGN_UP_COMPLETE_001
        },
        userPassword: {
            error: false,
            tip: appTips.USER_SIGN_UP_COMPLETE_002
        },
    });
    const {
        submitButtonRef,
        loadingState,
        submitResultRef,
        emailRef,
        verificationRef,
    } = submitStep;

    const test = {loginName: "loginName_", password: "password_"};

    const [signUp, {isLoading}] = useSignUpMutation();

    const handleSubmit = (e: React.SubmitEvent<RegisterFormElements>) => {
        e.preventDefault();
        if (tips.loginName.error || tips.userPassword.error) {

            return;
        }

        loadingState[1](true);
        const {elements} = e.currentTarget;
        const userPassword = elements.loginName.value;
        const loginName = elements.loginName.value;

        signUp({
            loginName,
            userPassword,
            userEmail: emailRef.current,
            k: verificationRef.current ?? "",
        })
            .unwrap()
            .then(result => {
                submitResultRef.current = result.code.id.startsWith(ResponseCodeEnum.SUCCESS.id);
            })
            .catch(() => {
                submitResultRef.current = false;
            })
            .finally(() => {
                loadingState[1](false);
            })
    }

    return (
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
            <LoadingButton type={"submit"} sx={{width: "80px", margin: "0 auto", display: "none"}}
                           size={"large"} loading={isLoading} ref={submitButtonRef}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
}

export {RegisterComp}