import {Box, CardMedia, Checkbox, CircularProgress, Grid2, IconButton, Stack, styled, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {LoadingButton} from "@mui/lab";
import {useLazyCaptchaQuery} from "../app/api/bsmSlice.ts";

const AppCaptcha = () => {
    const [getCaptcha, {data, isFetching}] = useLazyCaptchaQuery();
    const [lifespan, setLifespan] = useState<number>(0);
    const lifespanTimer = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (data) {
            setLifespan(data.data.t);
            lifespanTimer.current = setInterval(() => {
                setLifespan((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
            }, 1000);
            return () => {
                if (lifespanTimer.current) {
                    clearInterval(lifespanTimer.current)
                }
            };
        }
    }, [data]);

    const handleGetCaptcha = () => {
        if (lifespanTimer.current) {
            clearInterval(lifespanTimer.current);
        }
        getCaptcha();
    }

    if (data) {
        const captcha = "data:image/png;base64, " + data.data.i;

        return (
            <Grid2 container spacing={1}>
                <Grid2 size={10}>
                    <Stack spacing={0} sx={{alignContent: 'center', alignItems: 'center'}}>
                        <CardMedia component="img" src={captcha} sx={{width: '135px !important'}}/>
                        <Typography variant={"caption"} sx={{fontStyle: 'italic !important'}}>
                            lifespan: {lifespan} sec(s).
                        </Typography>
                    </Stack>
                </Grid2>
                <Grid2 size={2} sx={{display: "flex"}}>
                    <IconButton onClick={handleGetCaptcha} disabled={isFetching} sx={{padding: '0'}}>
                        {isFetching ? (
                            <CircularProgress size={24}/>
                        ) : (
                            <AutorenewIcon/>
                        )}
                    </IconButton>
                </Grid2>
            </Grid2>
        );
    }

    const MyContainer = styled(Box)(() => ({
        position: "relative",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }));

    const MyCheckbox = styled(Checkbox)(() => ({
        position: "absolute",
        color: "rgba(0,0,0,0) !important",
        zIndex: 0
    }));
    const MyLoadingButton = styled(LoadingButton)(() => ({
        position: "absolute",
        zIndex: 1,
        height: "100%",
        padding: 0
    }));


    return (
        <Grid2 container spacing={0}>
            <Grid2 size={12}>
                <MyContainer>
                    <MyLoadingButton loading={isFetching}
                                     onClick={handleGetCaptcha}>
                        Get Captcha Code*
                    </MyLoadingButton>
                    <MyCheckbox required/>
                </MyContainer>
            </Grid2>
        </Grid2>
    );
};

export {AppCaptcha};