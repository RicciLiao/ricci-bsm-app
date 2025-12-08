import {createTheme} from "@mui/material";
import {appTheme} from "@theme/appTheme.ts";

export const appMenuTheme = createTheme(appTheme,
        {
            components: {
                MuiPopper: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "white",
                            boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.3)",
                            borderRadius: "5px"
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            variants: [
                                {
                                    props: {variant: "text"},
                                    style: {
                                        width: "100%",
                                        justifyContent: "left",
                                        "&:focus": {
                                            outline: "none",
                                        },
                                    },
                                }
                            ],
                        }
                    }
                },
            }
        }
    )
;
