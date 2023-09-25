// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[500], // Your primary color
      },
      secondary: {
        main: red[500], // Your secondary color
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Your preferred font
    },
  });
  
  export default theme;
