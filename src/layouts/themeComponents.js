export const componentStyles = (darkMode, isXs) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        maxWidth: '100%',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        maxWidth: '100%',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      'html::-webkit-scrollbar, body::-webkit-scrollbar': {
        display: 'none',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
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
  MuiSimpleTreeView: {
    styleOverrides: {
      root: {
        background: darkMode ? '#000203' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000203',
        padding: '1rem',
        borderRadius: '4px',
      },
    },
  },
  MuiTreeItem: {
    styleOverrides: {
      root: {
        background: 'transparent',
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        margin: '4px 0',
        '&:hover': {
          '& .MuiTreeItem-label': {
            color: '#00fff2',
            textShadow: '0 0 8px rgba(0, 255, 242, 0.6)',
          }
        },
      },
      label: {
        fontSize: '1.2rem',
        color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 2, 3, 0.9)',
        letterSpacing: '0.5px',
        padding: '8px 16px',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
      },
      content: {
        backgroundColor: 'transparent !important',
        marginLeft: '1rem',
        padding: '4px',
        borderRadius: '12px',
        background: darkMode 
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(223, 227, 238, 0.6))',
        boxShadow: darkMode
          ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), inset -1px -1px 2px rgba(255, 255, 255, 0.05)'
          : 'inset 1px 1px 3px rgba(223, 227, 238, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.8)',
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
        '&.Mui-expanded': {
          backgroundColor: 'transparent !important',
          background: darkMode
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05))'
            : 'linear-gradient(135deg, rgba(223, 227, 238, 0.6), rgba(255, 255, 255, 0.9))',
          boxShadow: darkMode
            ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 0 15px rgba(0, 255, 242, 0.1)'
            : 'inset 2px 2px 5px rgba(223, 227, 238, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.9), 0 0 20px rgba(223, 227, 238, 0.4)',
          '& .MuiTreeItem-label': {
            color: '#00fff2',
            textShadow: '0 0 8px rgba(0, 255, 242, 0.4)',
          },
          '& .MuiSvgIcon-root': { 
            color: '#00fff2 !important',
            filter: 'drop-shadow(0 0 6px rgba(0, 255, 242, 0.4))',
          },
        },
        '&.Mui-focused, &.Mui-selected': {
          backgroundColor: 'transparent !important',
          '& .MuiTreeItem-label': {
            color: '#00fff2',
            textShadow: '0 0 8px rgba(0, 255, 242, 0.4)',
          }
        },
      },
      iconContainer: {
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 2, 3, 0.9)',
          transition: 'all 0.3s ease',
          filter: darkMode 
            ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))'
            : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.1))',
        },
      },
      group: {
        marginLeft: '1rem',
        paddingLeft: '1rem',
        borderLeft: darkMode
          ? '1px solid rgba(0, 255, 242, 0.15)'
          : '1px solid rgba(0, 200, 192, 0.2)',
        boxShadow: darkMode
          ? '-1px 0 8px rgba(0, 255, 242, 0.05)'
          : '-1px 0 8px rgba(223, 227, 238, 0.3)',
      }
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.5) 100%)`,
        boxShadow: 'inset 0 2px 8px rgba(97,218,251,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)',
        border: 'none !important',
        '&::before': {
          display: 'none !important',
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-expanded': {
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
          '& .MuiAccordionSummary-content .MuiTypography-root': {
            transition: 'font-size 0.3s ease',
            color: 'white',
          },
        },
        '& .MuiAccordionSummary-content': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& .MuiTypography-root': {
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
          color: 'white',
        },
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
        '&::before': {
          display: 'none !important',
        },
        '& .MuiTypography-root': {
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
          color: 'white',
        },
      },
    },
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
        marginBottom: '16px',
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
          '& .MuiTypography-root': {
            color: 'white',
            textShadow: '0 0 10px rgba(97,218,251,0.8)',
          },
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
          },
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
        overflow: 'hidden',
        width: '100%',
        color: 'white',
        '& .MuiButton-root': {
          background: 'rgba(97,218,251,0.2)',
          '&:hover': {
            background: 'rgba(97,218,251,0.3)',
          },
        },
      },
    },
  },
});