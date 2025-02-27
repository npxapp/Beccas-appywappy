// themes/PrivateTheme
import { createTheme } from '@mui/material';

const getTheme = (darkMode = true, isXs = false) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffffff' : '#000000',
      },
      background: {
        default: darkMode ? '#0d0e0e' : '#ffffff',
        paper: darkMode ? '#0d0e0e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Roboto',
      allVariants: {
        fontSize: '1rem',
      },
    },
  });
};

export default getTheme;