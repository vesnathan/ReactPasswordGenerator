import { createTheme } from '@mui/material/styles';
import { amber, lightGreen } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: amber[500],
            contrastText: "#FFFFFF",
        }
    },
    props: {
        // Name of the component ⚛️
        MuiButtonBase: {
          
        },
    }
});



  export default theme;
