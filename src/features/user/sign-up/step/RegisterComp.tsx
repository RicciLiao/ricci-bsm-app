import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import {AppTextFieldTips} from "@interfaces/AppTextFieldTips";
import {AppTips} from "@common/AppTips";
import {AppConstants} from "@common/AppConstants.ts";
import {useSignUpMutation} from "@app/api/bsmSlice.ts";
import {ResponseCodeEnum} from "@common/ResponseCodeEnum.ts";
import {FormBox, SignUpStepComp, SignUpStepCompProps} from "@/features/user/sign-up/SignUpStepComp.tsx";

interface SignUpFormFields extends HTMLFormControlsCollection {
    loginName: HTMLInputElement,
    userPassword: HTMLInputElement,
}

interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields
}

const passwordCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStatus: React.Dispatch<React.SetStateAction<AppTextFieldTips>>
) => {
    const password = e.target.value;
    if (!password) {
        setStatus({error: false, tip: AppTips.USER_SIGN_UP_COMPLETE_002});

        return;
    }
    if (password.length < 8) {
        setStatus({error: true, tip: AppTips.USER_SIGN_UP_COMPLETE_002});

        return;
    }
    if (!AppConstants.REGEX_ALPHA.test(password) || !AppConstants.REGEX_NUMERIC.test(password)) {
        setStatus({error: true, tip: AppTips.USER_SIGN_UP_COMPLETE_002});

        return;
    }
    setStatus({error: false, tip: AppTips.USER_SIGN_UP_COMPLETE_002});
};

const loginNameCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStatus: React.Dispatch<React.SetStateAction<AppTextFieldTips>>
) => {
    const loginName = e.target.value;
    if (!loginName) {
        setStatus({error: false, tip: AppTips.USER_SIGN_UP_COMPLETE_001});

        return;
    }
    if (loginName.length < 8) {
        setStatus({error: true, tip: AppTips.USER_SIGN_UP_COMPLETE_001});

        return;
    }
    if (!AppConstants.REGEX_ALPHA.test(loginName) || !AppConstants.REGEX_NUMERIC.test(loginName)) {
        setStatus({error: true, tip: AppTips.USER_SIGN_UP_COMPLETE_001});

        return;
    }
    setStatus({error: false, tip: AppTips.USER_SIGN_UP_COMPLETE_001});
}

const RegisterComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const [loginNameTips, setLoginNameTips] = useState<AppTextFieldTips>({
        error: false,
        tip: AppTips.USER_SIGN_UP_COMPLETE_001
    });
    const [userPasswordTips, setUserPasswordTips] = useState<AppTextFieldTips>({
        error: false,
        tip: AppTips.USER_SIGN_UP_COMPLETE_002
    });

    const [signUp, {isLoading}] = useSignUpMutation();

    const handleSubmit = (e: React.FormEvent<SignUpFormElements>) => {
        e.preventDefault();
        if (loginNameTips.error || userPasswordTips.error) {

            return;
        }

        submitStep.stepIsLoadingState[1](true);
        const {elements} = e.currentTarget;
        const loginName = elements.loginName.value;
        const userPassword = elements.loginName.value;

        signUp({
            loginName,
            userPassword,
            userEmail: submitStep.stepEmail.current,
            k: submitStep.stepVerification.current ?? "",
        })
            .unwrap()
            .then(result => {
                submitStep.stepSubmitResult.current = result.code.id === ResponseCodeEnum.SUCCESS;
            })
            .catch(() => {
                submitStep.stepSubmitResult.current = false;
            })
            .finally(() => {
                submitStep.stepIsLoadingState[1](false);
                submitStep.stepEmail.current = null;
                submitStep.stepVerification.current = null
            })
    }

    return (
        <FormBox onSubmit={handleSubmit}>
            <TextField required label="Login Name" variant="standard" name="loginName" fullWidth
                       helperText={loginNameTips.tip}
                       error={loginNameTips.error}
                       onBlur={e => loginNameCheck(e, setLoginNameTips)}
            />
            <TextField required label="Password" variant="standard" name="userPassword" fullWidth type="password"
                       helperText={userPasswordTips.tip}
                       error={userPasswordTips.error}
                       onBlur={e => passwordCheck(e, setUserPasswordTips)}
            />
            <LoadingButton type={'submit'} sx={{width: '80px', margin: '0 auto', display: 'none'}}
                           size={"large"} loading={isLoading} ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
}

export {RegisterComp}