import backgroundImage from '../images/Background.png';

export const componentStyles = (darkMode, isXs) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        maxWidth: '100%',
        msOverflowStyle: 'none', // For IE
        scrollbarWidth: 'none', // For Firefox
      },
      body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center top 200px',
        maxWidth: '100%',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      'html::-webkit-scrollbar, body::-webkit-scrollbar': {
        display: 'none', // For Chrome, Edge, and Safari
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
  MuiToolbar: {
    variants: [
      {
        props: { variant: 'snack' },
        style: () => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          '&.MuiToolbar-root': {
            backgroundColor: 'transparent',
          },
        }),
      },
    ],
  },
  MuiListItem: {
    styleOverrides: {
      root: () => ({
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }),
    },
  },
  MuiPaper: {
    variants: [
      {
        props: { variant: 'dialer' },
        style: ({ theme }) => ({
          width: '100%',
        }),
      },
      {
        props: { variant: 'fade' },
        style: ({ theme }) => ({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          zIndex: 2,
          pointerEvents: 'none',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
          transition: 'background 3s ease',
        }),
      },
    ],
  },
  MuiAccordion: {
    variants: [
      {
        props: { variant: 'panel' },
        style: ({ theme }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: darkMode ? 'center' : 'flex-start',
          flexGrow: 0,
          background: 'transparent',
          border: 'none !important',
          boxShadow: 'black !important',
          '&::before': {
            display: 'none !important',
          },
        }),
      }
    ],
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.05) 100%)`,
        backdropFilter: 'blur(8px)',
        borderRadius: '8px',
        marginBottom: '4px',
        position: 'relative',
        boxShadow: 'inset 0 2px 8px rgba(97,218,251,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)',
        '&:before': {
          display: 'none',
        },
        color: 'white',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(97,218,251,0.1)',
          pointerEvents: 'none',
          animation: 'scanline 6s linear infinite',
        }
      }
    }
  },
  MuiAccordionSummary: {
    variants: [
      {
        props: { variant: 'panel' },
        style: ({ theme }) => ({
          marginLeft: darkMode ? 0 : 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'transparent',
          borderRadius: 20,
          '&.Mui-expanded': {
            backgroundColor: darkMode ? 'none' : theme.palette.background.paper,
            '& .MuiAccordionSummary-content .MuiTypography-root': {
              transition: 'font-size 0.3s ease',
              fontSize: darkMode ? '2rem' : 'initial',
              color: darkMode ? theme.palette.secondary.main : theme.palette.primary.main,
            },
          },
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: darkMode ? 'center' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            gap: theme.spacing(1),
          },
        }),
      }
    ],
    styleOverrides: {
      root: {
        bgcolor: 'transparent',
        borderRadius: '8px 8px 0 0',
        '& .MuiTypography-root': {
          textShadow: '0 0 10px rgba(97,218,251,0.8)',
          color: 'white',
          fontWeight: 500,
          animation: 'glow 2s ease-in-out infinite'
        },
        '& .MuiSvgIcon-root': {
          color: 'rgba(97,218,251,0.8)',
        },
        '&:hover': {
          bgcolor: 'rgba(97,218,251,0.1)',
        },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(97,218,251,0.2), transparent)',
          animation: 'holographic 3s linear infinite',
        }
      }
    }
  },
  MuiAccordionDetails: {
    variants: [
      {
        props: { variant: 'panel' },
        style: ({ theme }) => ({
          display: 'flex',
          flexDirection: darkMode ? 'column' : 'row',
          alignItems: darkMode ? 'center' : 'inherit',
          justifyContent: darkMode ? 'center' : 'flex-start',
          borderLeft: darkMode ? 'none' : '1px solid',
          borderLeftColor: darkMode ? 'none' : theme.palette.background.paper,
          marginLeft: darkMode ? 0 : 34,
          '& .MuiTypography-root': {
            color: darkMode ? '#ffffff' : theme.palette.text.secondary,
          },
        }),
      }
    ],
    styleOverrides: {
      root: {
        bgcolor: 'rgba(0,0,0,0.3)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        '& .MuiTypography-root': {
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
          color: 'rgba(97,218,251,0.8)',
        },
        '& .MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px',
          cursor: 'pointer',
          borderRadius: '4px',
          '&:hover': {
            bgcolor: 'rgba(97,218,251,0.1)',
          }
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '40px',
        position: 'relative',
        transition: 'height 0.3s ease',
        backgroundSize: '20px 20px',
        marginBottom: '16px',
        background: `linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.05) 100%)`,
        backdropFilter: 'blur(8px)',
        boxShadow: 'inset 0 2px 8px rgba(97,218,251,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
          width: 600,
        }
      })
    }
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        '& .MuiCardHeader-content': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          width: '100%',
          '& .MuiTypography-root': {
            color: 'white',
            textShadow: '0 0 10px rgba(97,218,251,0.8)',
          }
        },
        '& .MuiCardHeader-action': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          width: '100%',
          '& .MuiSvgIcon-root': {
            fontSize: '2rem',
            color: 'rgba(97,218,251,0.8)',
          }
        }
      }
    }
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        overflow: 'hidden',
        width: '100%',
        '& .MuiButton-root': {
          background: 'rgba(97,218,251,0.2)',
          '&:hover': {
            background: 'rgba(97,218,251,0.3)',
          }
        }
      }
    }
  }
});