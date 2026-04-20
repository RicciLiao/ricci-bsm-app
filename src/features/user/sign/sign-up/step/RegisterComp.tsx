import {useSignUpMutation} from "@app/slice/api/bsmSlice.ts";
import {appConstants} from "@common/appConstants.ts";
import {appTips} from "@common/appTips.ts";
import {SignUpStepComp, SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {FormBox} from "@features/user/sign/SignComp.tsx";
import {BsmUserInfo} from "@interfaces/api/BsmUserInfo.ts";
import {AppTextFieldTips} from "@interfaces/AppTextFieldTips";
import {LoadingButton} from "@mui/lab";
import {Avatar, Box, ButtonBase, TextField, Tooltip} from "@mui/material";
import {produce} from "immer";
import React, {useState} from "react";
import {ResponseCodeEnum} from "x-common-components-app";

interface RegisterFormFields extends HTMLFormControlsCollection {
    loginName: HTMLInputElement,
    userPassword: HTMLInputElement,
    userName: HTMLInputElement,
}

interface RegisterFormElements extends HTMLFormElement {
    readonly elements: RegisterFormFields
}

interface RegisterTips {
    loginName: AppTextFieldTips,
    userPassword: AppTextFieldTips,
    userName: AppTextFieldTips,
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

const userNameCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStatus: React.Dispatch<React.SetStateAction<RegisterTips>>,
) => {
    e.preventDefault();

    const userName = e.target.value;
    if (!userName) {
        setStatus(produce(draft => {
            draft.userName.error = false;
        }));
    } else if (userName.length > 25) {
        setStatus(produce(draft => {
            draft.userName.error = true;
        }));
    }
}

const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setAvatarSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
    setAvatarFile: React.Dispatch<React.SetStateAction<File | undefined>>,
) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
        setAvatarFile(file);
    }
};

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
        userName: {
            error: false,
            tip: appTips.USER_SIGN_UP_COMPLETE_003,
        }
    });
    const {
        submitButtonRef,
        loadingState,
        submitResultRef,
        emailRef,
        verificationRef,
        avatarSrcRef,
        userNameRef,
    } = submitStep;
    const [signUp, {isLoading}] = useSignUpMutation();
    const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(undefined);
    const [avatarFile, setAvatarFile] = React.useState<File | undefined>(undefined);

    const handleSubmit = (e: React.SubmitEvent<RegisterFormElements>) => {
        e.preventDefault();
        if (tips.loginName.error || tips.userPassword.error || tips.userName.error) {

            return;
        }

        loadingState[1](true);
        const {elements} = e.currentTarget;
        const user: BsmUserInfo =
            {
                userName: elements.userName.value,
                userPassword: elements.loginName.value,
                loginName: elements.loginName.value,
                userEmail: emailRef.current
            };
        const formData = new FormData();
        const userBlob = new Blob([JSON.stringify(user)], {type: 'application/json'});
        formData.append('user', userBlob);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        signUp({formData, k: verificationRef.current ?? ""})
            .unwrap()
            .then(result => {
                submitResultRef.current = result.code.id.startsWith(ResponseCodeEnum.SUCCESS.id);
                if (submitResultRef.current) {
                    avatarSrcRef.current = avatarSrc ?? "";
                    userNameRef.current = user.userName ?? "";
                }
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
            <Box padding={1}>
                <Tooltip title={"Upload your avatar"}>
                    <ButtonBase component="label" tabIndex={-1}
                                sx={{
                                    borderRadius: '40px',
                                    '&:has(:focus-visible)': {
                                        outline: '2px solid',
                                        outlineOffset: '2px',
                                    },
                                }}>
                        <Avatar src={avatarSrc} sx={{width: 90, height: 90}}/>
                        <input type="file" accept="image/*"
                               style={{
                                   border: 0,
                                   clip: 'rect(0 0 0 0)',
                                   height: '1px',
                                   margin: '-1px',
                                   overflow: 'hidden',
                                   padding: 0,
                                   position: 'absolute',
                                   whiteSpace: 'nowrap',
                                   width: '1px',
                               }}
                               onChange={e => handleAvatarChange(e, setAvatarSrc, setAvatarFile)}
                        />
                    </ButtonBase>
                </Tooltip>
            </Box>
            <TextField required label="Alias Name" variant="standard" name="userName" fullWidth helperText={tips.userName.tip}
                       error={tips.userName.error} onBlur={e => userNameCheck(e, setTips)}/>
            <TextField required label="Login Name" variant="standard" name="loginName" fullWidth helperText={tips.loginName.tip}
                       error={tips.loginName.error} onBlur={e => loginNameCheck(e, setTips)}/>
            <TextField required label="Password" variant="standard" name="userPassword" fullWidth type="password"
                       helperText={tips.userPassword.tip} error={tips.userPassword.error} onBlur={e => passwordCheck(e, setTips)}/>
            <LoadingButton type={"submit"} sx={{width: "80px", margin: "0 auto", display: "none"}}
                           size={"large"} loading={isLoading} ref={submitButtonRef}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
}

export {RegisterComp}