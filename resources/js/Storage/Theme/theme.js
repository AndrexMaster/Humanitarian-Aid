import {createTheme} from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            switchTrack: {
                main: '#f0f4f9',
                default: '#333333',
            }
        }
    },
    typography: {
        fontFamily: [
            '"Roboto Condensed"',
            'Roboto',
            'sans-serif',
        ].join(','),
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#cd0f19',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#1e1e1e',
            paper: '#1e1e1e',
            switchTrack: {
                main: '#f0f4f9',
                default: '#333333',
            }
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
    typography: {
        fontFamily: [
            '"Roboto Condensed"',
            'Roboto',
            'sans-serif',
        ].join(','),
        allVariants: {
            color: '#ffffff',
        },
    },

});
