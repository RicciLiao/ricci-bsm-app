import {SignUpStepCompProps} from "@features/user/sign/sign-up/SignUpStepComp.tsx";
import {Avatar, Box, Link, Typography} from "@mui/material";

const CompletedComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {
    return (
        <Box>
            <Avatar src={submitStep.avatarSrcRef.current ?? ''} sx={{width: 90, height: 90, margin: '0 auto'}}/>
            <Typography sx={{marginTop: 2}} variant={"subtitle1"}>{submitStep.userNameRef.current}</Typography>
            <Typography sx={{marginTop: 2, fontStyle: "italic"}} variant={"h6"}>Registration Completed!</Typography>
            <Typography sx={{marginTop: 2}} variant={"subtitle1"}>Now you can <Link href="/sign/in">login</Link> to your account!</Typography>
        </Box>
    );
}

export {CompletedComp};
