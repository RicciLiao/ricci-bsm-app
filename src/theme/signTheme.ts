import {colors, createTheme} from "@mui/material";
import {appTheme} from "@theme/appTheme.ts";

export const signTheme = createTheme(appTheme,
    {
        palette: {
            secondary: {
                main: colors.grey[500],
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                props: {
                                    variant: "standard"
                                },
                                style: {
                                    "--TextField-color": colors.grey[500],
                                    "--TextField-color-hover": colors.green[500],
                                    "--TextField-color-focus": colors.red[500],
                                    "& label": {
                                        color: colors.grey[500],
                                    },
                                    "& label[data-shrink=true]": {
                                        color: colors.grey[500],
                                        fontSize: "1.3rem",
                                        top: "-0.1rem",
                                        left: "-0.2rem",
                                    },
                                    "&:hover label": {
                                        color: colors.green[500],
                                    },
                                    "&:hover label[data-shrink=true]:not(.Mui-focused)": {
                                        color: colors.green[500],
                                        fontSize: "1.3rem",
                                        top: "-0.1rem",
                                        left: "-0.2rem",
                                    },
                                    "& label.Mui-focused": {
                                        color: colors.blue[500],
                                        fontSize: "1.3rem",
                                        top: "-0.1rem",
                                        left: "-0.2rem",
                                    },
                                }
                            }
                        ]
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent !important",
                        "&::before, &::after": {
                            borderBottom: "2px solid " + colors.grey[500],
                        },
                        "&:hover:not(.Mui-disabled, .Mui-error):before": {
                            borderBottom: "2px solid " + colors.green[500],
                        },
                        "&.Mui-focused:after": {
                            borderBottom: "2px solid " + colors.blue[500],
                        },
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
                                    "&:focus": {
                                        color: colors.blue[500],
                                        //border: "2px solid " + colors.blue[500] + " !important",
                                        outline: "none",
                                        backgroundColor: "transparent !important",
                                    },
                                    "&:hover": {
                                        color: colors.green[500],
                                        backgroundColor: "transparent !important",
                                    },
                                }
                            }
                        ]
                    }
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        "&:focus": {
                            color: colors.blue[500],
                            outline: "none",
                            backgroundColor: "transparent !important",
                        },
                        "&:hover": {
                            color: colors.green[500],
                            backgroundColor: "transparent !important",
                        },
                    }
                }
            }
        }
    })
;
