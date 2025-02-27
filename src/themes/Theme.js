// themes/Theme.js
import { createTheme } from '@mui/material';

const getTheme = (darkMode, isXs = false) => {
  const colors = {
    neonBlue: '#00fff2',
    neonPink: '#ff2a6d',
    darkBg: '#0a0b10',
    darkPaper: '#121318',
    darkBorder: '#2a2d3a',
    lightBg: '#eef1f7',
    lightPaper: '#ffffff',
    lightBorder: '#c0c5d0',
    darkText: 'rgba(255, 255, 255, 0.9)',
    darkTextSecondary: 'rgba(255, 255, 255, 0.7)',
    lightText: 'rgba(10, 11, 16, 0.9)',
    lightTextSecondary: 'rgba(10, 11, 16, 0.7)',
  };

  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.neonBlue,
        contrastText: darkMode ? colors.darkText : colors.darkBg,
      },
      secondary: {
        main: colors.neonPink,
        contrastText: darkMode ? colors.darkText : colors.lightText,
      },
      background: {
        default: darkMode ? colors.darkBg : colors.lightBg,
        paper: darkMode ? colors.darkPaper : colors.lightPaper,
      },
      text: {
        primary: darkMode ? colors.darkText : colors.lightText,
        secondary: darkMode ? colors.darkTextSecondary : colors.lightTextSecondary,
      },
    },
    typography: {
      fontFamily: '"Rajdhani", "Roboto", "Orbitron", sans-serif',
      allVariants: {
        color: darkMode ? colors.darkText : colors.lightText,
      },
      h1: {
        fontFamily: '"Orbitron", "Rajdhani", sans-serif',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      },
      h2: {
        fontFamily: '"Orbitron", "Rajdhani", sans-serif',
        fontWeight: 700,
        letterSpacing: '0.05em',
      },
      h3: {
        fontFamily: '"Orbitron", "Rajdhani", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.03em',
      },
      h4: {
        fontFamily: '"Rajdhani", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
      h5: {
        fontFamily: '"Rajdhani", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
      h6: {
        fontFamily: '"Rajdhani", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
      button: {
        fontFamily: '"Rajdhani", sans-serif',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
      overline: {
        fontFamily: '"Orbitron", sans-serif',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '@font-face': [
            {
              fontFamily: 'Orbitron',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 400,
              src: `url(https://fonts.gstatic.com/s/orbitron/v19/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2) format('woff2')`,
              unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
            },
            {
              fontFamily: 'Rajdhani',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 400,
              src: `url(https://fonts.gstatic.com/s/rajdhani/v10/LDIxapCSOBg7S-QT7p4HM-M.woff2) format('woff2')`,
              unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
            },
          ],
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: darkMode ? colors.darkPaper : colors.lightPaper,
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            backgroundClip: 'padding-box',
            border: darkMode ? `1px solid ${colors.darkBorder}` : `1px solid ${colors.lightBorder}`,
            boxShadow: darkMode
              ? '0 4px 20px 0 rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(0, 0, 0, 0.2)'
              : '0 4px 20px 0 rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(223, 227, 238, 0.8)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
            '&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3': {
              color: darkMode ? colors.darkText : colors.lightText,
              textShadow: darkMode ? '0 0 8px rgba(0, 255, 242, 0.2)' : '0 0 1px rgba(0, 200, 192, 0.1)',
            },
            '&.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6': {
              color: darkMode ? colors.darkText : colors.lightText,
            },
            '&.MuiTypography-subtitle1, &.MuiTypography-subtitle2': {
              color: darkMode ? colors.darkTextSecondary : colors.lightTextSecondary,
            },
            '&.MuiTypography-overline': {
              color: colors.neonBlue,
              textShadow: darkMode ? '0 0 8px rgba(0, 255, 242, 0.3)' : 'none',
            },
          },
        },
      },
      MuiSimpleTreeView: {
        styleOverrides: {
          root: {
            background: darkMode ? colors.darkBg : colors.lightPaper,
            color: darkMode ? colors.darkText : colors.lightText,
            borderRadius: '4px',
            padding: '8px',
            border: darkMode ? `1px solid ${colors.darkBorder}` : `1px solid ${colors.lightBorder}`,
          },
        },
      },
      MuiTreeItem: {
        styleOverrides: {
          root: {
            background: 'transparent',
            transition: 'all 0.3s ease',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
            margin: '2px 0',
          },
          label: {
            color: darkMode ? colors.darkText : colors.lightText,
            letterSpacing: '0.5px',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            padding: '8px 12px',
            fontFamily: '"Rajdhani", sans-serif',
            fontWeight: 500,
          },
          content: {
            backgroundColor: 'transparent !important',
            borderRadius: '12px',
          },
        },
      },
    },
  });
};

export default getTheme;