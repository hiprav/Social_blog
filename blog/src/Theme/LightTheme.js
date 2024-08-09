import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light', // Set the theme type to light
    primary: {
      main: '#2196f3', // Set your primary color
    },
    secondary: {
      main: '#f50057', // Set your secondary color
    },
    background:{
        
        paper: 'white' 
      },
    
  },
});

export default lightTheme;
