import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#3751FF',
      transparent: '#3751FF50',
    },
    secondary: {
      main: '#2a70d9',
      transparent: '#2a70d950',
    },
    warning: {
      main: '#FEC400',
      transparent: '#FEC40050',
    },
    success: {
      main: '#198754',
      transparent: '#19875450',
    },
  },
  typography: {
    fontFamily: `Montserrat, Mulish, Poppins, sans-serif`,
  },
  transitions: {
    easing: {
      easeOut: 'ease-out',
      sharp: 'ease-out',
    },
  },
});

export default responsiveFontSizes(mainTheme);
