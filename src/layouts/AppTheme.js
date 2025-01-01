import { createTheme } from '@mui/material';
import { componentStyles } from './themeComponents';
import { componentButtons } from './themeButtons';
import { componentForms } from './themeForms';
import { blue, grey } from '@mui/material/colors';

const getTheme = (darkMode, isXs = false) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffffff' : '#000000',
      },
      secondary: {
        main: darkMode ? '#f9d71c' : '#f3f3f3',
      },
      background: {
        default: darkMode ? '#000000' : '#ffffff',
      },
      blue: blue, 
      grey: grey, 
    },
    typography: {
      fontFamily: 'Poppins',
    },
    components: {
      ...componentStyles(darkMode, isXs),
      ...componentButtons(darkMode, isXs),
      ...componentForms(darkMode, isXs),
      MuiTypography: {
        variants: [
          {
            props: { variant: 'customPanel' },
            style: ({ theme }) => ({
              flex: '0 0 auto',
              borderRadius: 20,
              border: 'none',
              fontWeight: 200,
              letterSpacing: '-0.5px',
              textTransform: 'none',
              fontSize: '1rem',
              color: darkMode ? theme.palette.secondary.main : theme.palette.primary.main,
            }),
          },
          {
            props: { variant: 'customTitle' },
            style: ({ theme }) => ({
              fontWeight: 700,
              fontSize: '3.10rem',
              fontFamily: 'kornucopiaregular',
              flex: '0 0 auto',
              minHeight: 0,
              height: 'auto',
              lineHeight: 0.8,
              borderRadius: 20,
              border: 'none',
              textTransform: 'none',
              color: darkMode ? '#ffffff' : '#000000',
            }),
          },
          {
            props: { variant: 'body2' },
            style: ({ theme }) => ({
              color: darkMode ? '#ffffff' : '#000000',
              marginTop: 1,
              fontSize: '16px',
              textAlign: 'center',
              maxWidth: '80%',
            }),
          },
          {
            props: { variant: 'h6' },
            style: ({ theme }) => ({
              color: darkMode ? '#ffffff' : '#000000',
              marginTop: 2,
              fontSize: '2rem',
            }),
          },
        ],
      },
      MuiSvgIcon: {
        variants: [
        {
          props: { variant: 'SuccessIcon' },
          style: ({ theme }) => ({
            animation: 'flicker 4s infinite, phosphorScreen 0.1s steps(2) infinite',
            position: 'relative',
             '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(transparent 50%, rgba(97,218,251,0.1) 50%)',
              backgroundSize: '100% 4px',
              animation: 'scan 4s linear infinite',
              pointerEvents: 'none'
            },
          }),
        },
        {
          props: { variant: 'WarningIcon' },
          style: ({ theme }) => ({
            animation: 'flicker 4s infinite, phosphorScreen 0.1s steps(2) infinite',
            position: 'relative',
             '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(transparent 50%, rgba(97,218,251,0.1) 50%)',
              backgroundSize: '100% 4px',
              animation: 'scan 4s linear infinite',
              pointerEvents: 'none'
            },
          }),
        },
        {
          props: { variant: 'ErrorIcon' },
          style: ({ theme }) => ({
            animation: 'flicker 4s infinite, phosphorScreen 0.1s steps(2) infinite',
            position: 'relative',
             '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(transparent 50%, rgba(97,218,251,0.1) 50%)',
              backgroundSize: '100% 4px',
              animation: 'scan 4s linear infinite',
              pointerEvents: 'none'
            },
          }),
        },
          {
            props: { variant: 'arrowIcon' },
            style: ({ theme }) => ({
              display: darkMode ? 'none' : 'inherit',
              fontSize: '1rem',
              color: theme.palette.text.secondary,
            }),
          },
          {
            props: { variant: 'customIcon' },
            style: ({ theme }) => ({
              color: darkMode ? '#ffffff' : '#000000',
            }),
          },
        ],
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            background: 'black',
          }),
        },
      },
    },
  });
};

export default getTheme;