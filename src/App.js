import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';

// Material UI Components
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


// Custom Components
import Header from "./components/header/header.component.js";
import Error from "./components/error/error.component.js";

// import theme
import theme from "./theme.js";

function generatePassword(useUpperCharacters,useLowerCharacters,useSpecialCharacters,useNumericCharacters,passwordLength) {
    var charSetToUse = "";
    var generatedPassword = "";
    if (useUpperCharacters) { charSetToUse += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; }
    if (useLowerCharacters) { charSetToUse += "abcdefghijklmnopqrstuvwxyz"; }
    if (useSpecialCharacters) { charSetToUse += "\"!”#$%&’()*+,-./:;<=>?@[\\]^_`{|}~"; }
    if (useNumericCharacters) { charSetToUse += "0123456789"; }

    for (var i = 0; i < passwordLength; i++) {
      generatedPassword += charSetToUse.charAt(Math.floor(Math.random() * charSetToUse.length));
    }

    return generatedPassword;
}


function App() {

  const [useUpperCharacters, setUseUpperCharacters] = useState(true);
  const [useLowerCharacters, setUseLowerCharacters] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
  const [useNumericCharacters, setUseNumericCharacters] = useState(true);
  const [passwordLength, setPasswordLength] = useState(50);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [charSetsSelected, setCharSetsSelected] = useState(4);
  const [generatedPassword, setGeneratedPassword] = useState("");

  console.log("charSetsSelected start: ", charSetsSelected);

  useEffect(() => {     
      if (charSetsSelected < 2) {
          setErrorStatus(true);
          setErrorMessage("Please choose at least 2 character sets.");
      }  
      else {
          setErrorStatus(false);
          setErrorMessage("");
      }
  });
  const handleCheckboxChange = (event) => {
      (event.target.checked) ? setCharSetsSelected(charSetsSelected + 1) : setCharSetsSelected(charSetsSelected - 1);
      switch (event.target.id) {
          case "useUpperCharacters":
              setUseUpperCharacters(!useUpperCharacters);
              break;
          case "useLowerCharacters":
              setUseLowerCharacters(!useLowerCharacters);
              break;
          case "useSpecialCharacters":
              setUseSpecialCharacters(!useSpecialCharacters);
              break;
          case "useNumericCharacters":
              setUseNumericCharacters(!useNumericCharacters);
              break;
          default:
              break;
      }    
  };

  const handleSliderChange = (event) => {
    setPasswordLength(event.target.value);
  }

  return  (
    <>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" className="mainContainer">
          <Grid container  > 
            <Grid container justifyContent="center">
              <Grid item  xs={10} sm={8} >
                <Header titleText="PASSWORD GENERATOR" />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item  xs={10} sm={8}>
                  {
                    generatedPassword === "" &&
                
                    <FormGroup>
                        <Typography sx={{fontSize: {md: 20,sm: 15,xs: 14}}} gutterBottom>Password Length: {passwordLength}</Typography>
                        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="off" onChange={handleSliderChange} min={8} max={128} sx={{mb: 5}} />
                        <FormControlLabel control={<Checkbox defaultChecked id="useUpperCharacters"   onChange={handleCheckboxChange}/>} label={<Typography sx={{fontSize: {md: 20,sm: 15,xs: 12}}}>Use Upper Case Characters</Typography>}/>
                        <FormControlLabel control={<Checkbox defaultChecked id="useLowerCharacters"   onChange={handleCheckboxChange}/>} label={<Typography sx={{fontSize: {md: 20,sm: 15,xs: 12}}}>Use Lower Case Characters</Typography>}/>
                        <FormControlLabel control={<Checkbox defaultChecked id="useSpecialCharacters" onChange={handleCheckboxChange}/>} label={<Typography sx={{fontSize: {md: 20,sm: 15,xs: 12}}}>Use Special Case Charaxters</Typography>}/>
                        <FormControlLabel control={<Checkbox defaultChecked id="useNumericCharacters" onChange={handleCheckboxChange}/>} label={<Typography sx={{fontSize: {md: 20,sm: 15,xs: 12}}}>Use Numeric Case Characters</Typography>}/>
                        {
                        !errorStatus &&
                        < Button id="generatePasswordButton" variant="contained" sx={{mt: 5}} color="primary" onClick={() => setGeneratedPassword(generatePassword(useUpperCharacters,useLowerCharacters,useSpecialCharacters,useNumericCharacters,passwordLength))}>GENERATE PASSWORD</Button>
                        }
                        {
                        errorStatus &&
                          <Error errorMessage={errorMessage}/>
                        }
                    </FormGroup>
                  } 
                  {
                    generatedPassword !== "" &&
                    <>
                    <div id="generatedPaswordDisplay">{generatedPassword}</div>
                    <FormGroup>
                        < Button id="generatePasswordButton" variant="contained" sx={{mt: 5}} color="primary" onClick={() => setGeneratedPassword(generatePassword(useUpperCharacters,useLowerCharacters,useSpecialCharacters,useNumericCharacters,passwordLength))}>GENERATE AGAIN</Button>
                        < Button id="resetButton" variant="contained" sx={{mt: 1}} color="primary" onClick={() => setGeneratedPassword("")}>RESET</Button>
                        < Button id="copyButton" variant="contained" sx={{mt: 1}} color="primary" onClick={() => {navigator.clipboard.writeText(generatedPassword)}}>COPY</Button>
                    </FormGroup>
                    </>
                  }
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </CssBaseline>
    </>
  );
}

export default App;
