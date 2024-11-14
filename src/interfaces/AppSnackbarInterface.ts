import {AlertColor} from "@mui/material";

interface AppSnackbarInterface {
    code: number,
    date: number,
    alertType: AlertColor,
    message: string,
}

export {type AppSnackbarInterface};