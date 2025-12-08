import {Box} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {SignComp} from "@features/user/sign/SignComp.tsx";

const SignInComp = () => {

    return (
        <SignComp>
            <h2>Sign Up</h2>

            <Box>
                <LoadingButton type={"submit"} sx={{width: "80px", float: "right"}}
                    /*onClick={}*/
                               size={"large"} loading={false}>
                    {`Next >`}
                </LoadingButton>
            </Box>
        </SignComp>
    );
}

export {SignInComp}
