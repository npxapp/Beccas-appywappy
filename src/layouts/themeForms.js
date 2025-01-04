export const componentForms = (darkMode, isXs) => ({
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        background: 'linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.05) 100%)',
        color: theme.palette.text.primary,
        borderRadius: '4px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        fontSize: '1.6rem',
        animation: darkMode ? 'glow 2s ease-in-out infinite' : 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(97,218,251,0.2), transparent)',
          animation: 'buttonScan 3s linear infinite',
        },
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(97,218,251,0.25) 0%, rgba(97,218,251,0.15) 100%)',
          boxShadow: '0 0 15px rgba(97,218,251,0.3)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(1px)',
        },
        '&.Mui-disabled': {
          background: 'rgba(97,218,251,0.05)',
          border: '1px solid rgba(97,218,251,0.1)',
          color: 'rgba(255,255,255,0.3)',
        }
      })
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)',
          borderRadius: '4px',
          transition: 'all 0.3s ease',
          fontSize: '1.6rem',
          '&:hover': {
            border: '1px solid rgba(97,218,251,0.5)',
            boxShadow: '0 0 10px rgba(97,218,251,0.2)',
          },
          '&.Mui-focused': {
            border: '1px solid rgba(97,218,251,0.8)',
            boxShadow: '0 0 15px rgba(97,218,251,0.3)',
          },
          '& fieldset': {
            border: 'none',
          },
          '& input': {
            color: theme.palette.text.primary,
            textShadow: '0 0 5px rgba(97,218,251,0.5)',
            '&::placeholder': {
              color: 'rgba(255,255,255,0.5)',
            }
          }
        }
      })
    }
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(97,218,251,0.5), transparent)',
          animation: 'scanline 4s linear infinite',
        }
      }
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        background: 'transparent',
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          background: 'rgba(97,218,251,0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'rgba(97,218,251,0.8)',
            boxShadow: '0 0 10px rgba(97,218,251,0.5)',
          }
        },
        '&.Mui-selected': {
          background: 'rgba(97,218,251,0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'rgba(97,218,251,1)',
            boxShadow: '0 0 15px rgba(97,218,251,0.8)',
          }
        }
      })
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'rgba(97,218,251,0.8)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: '0.75rem',
        '&.Mui-focused': {
          color: 'rgba(97,218,251,1)',
          textShadow: '0 0 5px rgba(97,218,251,0.5)',
        }
      })
    }
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        '.MuiTypography-root': {
          color: theme.palette.text.primary,
          fontSize: '0.9rem',
          letterSpacing: '0.5px',
        },
        '& .MuiCheckbox-root, & .MuiRadio-root': {
          color: 'rgba(97,218,251,0.5)',
          '&.Mui-checked': {
            color: 'rgba(97,218,251,1)',
            '& + .MuiTypography-root': {
              textShadow: '0 0 5px rgba(97,218,251,0.5)',
            }
          }
        }
      })
    }
  }
});

