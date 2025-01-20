import { createTheme } from '@mui/material';

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
      text: {
        primary: darkMode ? '#f5f5f5' : '#121212',
      },
    },
    typography: {
      fontFamily: 'Poppins',
      allVariants: {
        color: darkMode ? '#f5f5f5' : '#121212',
        fontSize: '1rem',
      },
    },
    components: {
      MuiTypography: {
        variants: [
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
        ],
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            background: theme.palette.background.default,
          }),
        },
      },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 20,
        [theme.breakpoints.up('sm')]: {
          width: 600,
        },
      }),
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column-reverse',
        '& .MuiCardHeader-content': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          width: '100%',
        },
        '& .MuiCardHeader-action': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          width: '100%',
        },
      }),
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
    },
  },
  MuiTreeItem: {
    styleOverrides: {
      root: {
        background: 'transparent',
      },
      content: {
        backgroundColor: 'transparent !important',
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
        '&.Mui-expanded': {
          backgroundColor: 'transparent !important',
        },
        '&.Mui-focused, &.Mui-selected': {
          backgroundColor: 'transparent !important',
        },
      },
    },
  },
    },
  });
};

export default getTheme;