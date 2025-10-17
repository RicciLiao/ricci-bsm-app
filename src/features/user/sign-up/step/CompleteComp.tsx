import {FormBox, SignUpStepComp, SignUpStepCompProps} from "@/features/user/sign-up/SignUpStepComp.tsx";
import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";

const CompleteComp: SignUpStepComp = ({submitStep}: { submitStep: SignUpStepCompProps }) => {

    return (
        <FormBox /*onSubmit={}*/>
            <TextField required label="Alias Name" variant="standard" name="userName" fullWidth
                       /*helperText={}
                       error={}
                       onBlur={}*/
            />
            <TextField required label="Password" variant="standard" name="userPassword" fullWidth type="password"
                       /*helperText={}
                       error={}
                       onBlur={}*/
            />
            <LoadingButton type={'submit'} sx={{width: '80px', margin: '0 auto', display: 'none'}}
                           size={"large"} /*loading={}*/ ref={submitStep.stepSubmitRef} href={""}>
                {`Next >`}
            </LoadingButton>
        </FormBox>
    );
}

export {CompleteComp}