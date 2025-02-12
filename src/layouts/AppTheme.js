import { createTheme } from '@mui/material';
import { componentStyles } from './themeComponents';
import { componentButtons } from './themeButtons';
import { componentPapers } from './themePapers';
import { componentForms } from './themeForms';

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
        paper: darkMode ? '#145661' : '#f5f5f5',
      },
    },
    typography: {
      fontFamily: 'Poppins',
      allVariants: {
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: '1rem',
      },
    },
    components: {
      ...componentStyles(darkMode, isXs),
      ...componentButtons(darkMode, isXs),
      ...componentPapers(darkMode, isXs),
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
            background: theme.palette.background.default,
          }),
        },
      },
    },
  });
};

export default getTheme;