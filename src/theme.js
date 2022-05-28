import { createTheme } from '@mui/material/styles';
import { amber, lightGreen, red } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: amber[500],
            contrastText: "#FFFFFF",
        },
        error: {
            main: red[400],
        },
        warning: {
            main: amber[500],
        }
    },
    props: {
        // Name of the component ⚛️
        MuiButtonBase: {
          
        },
    }
});



  export default theme;
