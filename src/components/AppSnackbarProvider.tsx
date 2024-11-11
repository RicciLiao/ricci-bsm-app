import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {remove, selectCurrentSnackbar} from "../features/appSnackbarSlice.ts";
import {forwardRef, useCallback, useEffect} from "react";
import {CustomContentProps, SnackbarContent, SnackbarProvider, useSnackbar} from "notistack";
import {Alert, AlertColor, AlertTitle, IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {format} from "date-fns";
import {AppConstants} from "../common/AppConstants.ts";

interface AppAlertInterface {
    message: string,
    date: number,
    severity: AlertColor,
}

interface AppAlertProps extends CustomContentProps {
    data: AppAlertInterface,
}

const AppSnackbar = () => {
    const {enqueueSnackbar} = useSnackbar();
    const appSnackBarState = useAppSelector(selectCurrentSnackbar);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (appSnackBarState.message) {
            const appAlert: AppAlertInterface = {
                message: appSnackBarState.message,
                date: appSnackBarState.date ? appSnackBarState.date : new Date().getTime(),
                severity: appSnackBarState.alertType ? appSnackBarState.alertType : AppConstants.SNACKBAR_SEVERITY_TYPE.info,
            };
            enqueueSnackbar(appSnackBarState.message + appSnackBarState.date,
                {
                    variant: "alert",
                    /*persist: true,*/
                    autoHideDuration: 6000,
                    preventDuplicate: true,
                    onClose: () => dispatch(remove()),
                    data: appAlert
                });
        }
    }, [appSnackBarState, enqueueSnackbar]);

    return (<></>);
};

export const AppSnackbarProvider = () => {

    return (
        <SnackbarProvider maxSnack={3}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          Components={{
                              alert: AppAlert
                          }}
        >
            <AppSnackbar/>
        </SnackbarProvider>
    );
}

const AppAlert = forwardRef<HTMLDivElement, AppAlertProps>((props, ref) => {
    const {id,} = props

    const {closeSnackbar} = useSnackbar();
    const handleDismiss = useCallback(() => {
        closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
        <SnackbarContent ref={ref}>
            <Alert
                variant={"filled"}
                severity={props.data.severity}
                sx={{maxWidth: "400px", wordWrap: "break-word", textAlign: "left"}}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        sx={{color: "inherit !important"}}
                        onClick={handleDismiss}
                    >
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            >
                <AlertTitle
                    sx={{display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
                    <Typography sx={{textTransform: "uppercase"}}>
                        {props.data.severity}
                    </Typography>
                </AlertTitle>
                <Typography>
                    {props.data.message}
                </Typography>
                <Typography variant={"body2"} sx={{textAlign: "right", fontStyle: "italic"}}>
                    {format(props.data.date, "yyyy-MM-dd hh:mm:ss")}
                </Typography>
            </Alert>
        </SnackbarContent>
    );
});