// themes/NewTheme.js
import { createTheme } from '@mui/material';

const getNewTheme = (darkMode, isXs = false) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      allVariants: {
        fontFamily: 'Roboto',
      },
    },
  });
};

export default getNewTheme;