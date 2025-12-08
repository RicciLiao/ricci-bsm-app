import {Avatar, Box, ButtonBase, TextField, Tooltip} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {FormBox, SignUpStepComp, SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {appTips} from "@common/appTips.ts";
import React, {useState} from "react";
import {AppTextFieldTips} from "@interfaces/AppTextFieldTips.ts";
import {produce} from "immer";

interface CompleteTips {
    userName: AppTextFieldTips,
}

const userNameCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStatus: React.Dispatch<React.SetStateAction<CompleteTips>>,
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
    setStatus: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setStatus(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

const CompleteComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    const [tips, setTips] = useState<CompleteTips>({
        userName: {
            error: false,
            tip: appTips.USER_SIGN_UP_COMPLETE_003,
        }
    });

    const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(undefined);

    return (
        <FormBox /*onSubmit={}*/>
            <Box>
                <Tooltip title={"Upload your avatar"}>
                    <ButtonBase
                        component="label"
                        tabIndex={-1}
                        sx={{
                            borderRadius: '40px',
                            '&:has(:focus-visible)': {
                                outline: '2px solid',
                                outlineOffset: '2px',
                            },
                        }}
                    >
                        <Avatar src={avatarSrc} sx={{width: 90, height: 90}}/>
                        <input
                            type="file"
                            accept="image/*"
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
                            onChange={e => handleAvatarChange(e, setAvatarSrc)}
                        />
                    </ButtonBase>
                </Tooltip>
            </Box>
            <TextField required label="Alias Name" variant="standard" name="userName" fullWidth
                       helperText={tips.userName.tip}
                       error={tips.userName.error}
                       onBlur={e => userNameCheck(e, setTips)}
                       sx={{}}
            />
            <LoadingButton type={"submit"} sx={{width: "80px", margin: "0 auto", display: "none"}}
                           size={"large"} /*loading={}*/ ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
}

export {CompleteComp}