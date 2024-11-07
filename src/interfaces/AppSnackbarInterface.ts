import {AlertColor} from "@mui/material/Alert/Alert";

export interface AppSnackbarInterface {
    message: string | null,
    date: number | null,
    alertType: AlertColor | null,
}