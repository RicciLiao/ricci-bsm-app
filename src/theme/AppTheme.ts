import {createTheme} from "@mui/material";

const TEXT_FIELD_COLOR = 'gray';
const TEXT_FIELD_COLOR_HOVER = 'green';
const TEXT_FIELD_COLOR_FOCUS = 'blue';

export const AppTheme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                props: {
                                    variant: 'filled'
                                },
                                style: {
                                    '--TextField-color': 'gray',
                                    '--TextField-color-hover': 'green',
                                    '--TextField-color-focus': 'red',
                                    '& label': {
                                        color: TEXT_FIELD_COLOR,
                                    },
                                    '& label[data-shrink=true]': {
                                        color: TEXT_FIELD_COLOR,
                                        fontSize: '1.3rem',
                                        top: '-0.1rem',
                                        left: '-0.2rem',
                                    },
                                    '&:hover label': {
                                        color: TEXT_FIELD_COLOR_HOVER,
                                    },
                                    '&:hover label[data-shrink=true]:not(.Mui-focused)': {
                                        color: TEXT_FIELD_COLOR_HOVER,
                                        fontSize: '1.3rem',
                                        top: '-0.1rem',
                                        left: '-0.2rem',
                                    },
                                    '& label.Mui-focused': {
                                        color: TEXT_FIELD_COLOR_FOCUS,
                                        fontSize: '1.3rem',
                                        top: '-0.1rem',
                                        left: '-0.2rem',
                                    },
                                }
                            }
                        ]
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent !important",
                        '&::before, &::after': {
                            borderBottom: '2px solid ' + TEXT_FIELD_COLOR,
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid ' + TEXT_FIELD_COLOR_HOVER,
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid ' + TEXT_FIELD_COLOR_FOCUS,
                        },
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                props: {variant: 'text'},
                                style: {
                                    color: TEXT_FIELD_COLOR,
                                    //border: '2px solid ' + TEXT_FIELD_COLOR,
                                    //textTransform: 'none',
                                    '&:focus': {
                                        color: TEXT_FIELD_COLOR_FOCUS,
                                        //border: '2px solid ' + TEXT_FIELD_COLOR_FOCUS + ' !important',
                                        outline: 'none',
                                        backgroundColor: "transparent !important",
                                    },
                                    '&:hover': {
                                        //border: '2px solid ' + TEXT_FIELD_COLOR_HOVER,
                                        color: TEXT_FIELD_COLOR_HOVER,
                                        backgroundColor: "transparent !important",
                                    },
                                }
                            }
                        ]
                    }
                }
            },
            MuiTouchRipple: {
                styleOverrides: {
                    root: {
                        opacity: 0,
                    }
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: TEXT_FIELD_COLOR,
                        //border: '2px solid ' + TEXT_FIELD_COLOR,
                        //textTransform: 'none',
                        '&:focus': {
                            color: TEXT_FIELD_COLOR_FOCUS,
                            //border: '2px solid ' + TEXT_FIELD_COLOR_FOCUS + ' !important',
                            outline: 'none',
                            backgroundColor: "transparent !important",
                        },
                        '&:hover': {
                            //border: '2px solid ' + TEXT_FIELD_COLOR_HOVER,
                            color: TEXT_FIELD_COLOR_HOVER,
                            backgroundColor: "transparent !important",
                        },
                    }
                }
            }
        }
    })
;