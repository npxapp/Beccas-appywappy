// ./src/layouts/themeForms.js
export const componentForms = (darkMode, isXs) => ({
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          fontSize: '1.1rem',
          letterSpacing: '0.5px',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          background: darkMode 
            ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(223, 227, 238, 0.6))',
          boxShadow: darkMode
            ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), inset -1px -1px 2px rgba(255, 255, 255, 0.05)'
            : 'inset 1px 1px 3px rgba(223, 227, 238, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.8)',
          
          '& fieldset': {
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 2, 3, 0.2)',
            transition: 'all 0.3s ease',
          },

          '&:hover': {
            background: darkMode
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))'
              : 'linear-gradient(135deg, rgba(223, 227, 238, 0.7), rgba(255, 255, 255, 0.95))',
            
            '& fieldset': {
              borderColor: '#00fff2',
              borderWidth: '2px',
              boxShadow: '0 0 10px rgba(0, 255, 242, 0.2)',
            },

            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: '#00fff2',
              filter: 'drop-shadow(0 0 6px rgba(0, 255, 242, 0.4))',
            },
          },

          '&.Mui-focused': {
            background: darkMode
              ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.08), rgba(0, 255, 242, 0.03))'
              : 'linear-gradient(135deg, rgba(0, 255, 242, 0.1), rgba(0, 255, 242, 0.05))',
            boxShadow: darkMode
              ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 0 15px rgba(0, 255, 242, 0.2)'
              : 'inset 2px 2px 5px rgba(223, 227, 238, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.9), 0 0 20px rgba(0, 255, 242, 0.3)',
            
            '& fieldset': {
              borderColor: '#00fff2',
              borderWidth: '2px',
              boxShadow: '0 0 15px rgba(0, 255, 242, 0.3)',
            },
          },

          '& input': {
            color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 2, 3, 0.9)',
            padding: '12px 16px',
            
            '&::placeholder': {
              color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 2, 3, 0.5)',
              opacity: 1,
            },
          },

          '& .MuiInputAdornment-root': {
            '& .MuiSvgIcon-root': {
              fontSize: '1.2rem',
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 2, 3, 0.7)',
              transition: 'all 0.3s ease',
            },
          },
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        background: darkMode 
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(223, 227, 238, 0.6))',
        boxShadow: darkMode
          ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), inset -1px -1px 2px rgba(255, 255, 255, 0.05)'
          : 'inset 1px 1px 3px rgba(223, 227, 238, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.8)',

        '& fieldset': {
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 2, 3, 0.2)',
          transition: 'all 0.3s ease',
        },

        '&:hover': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))'
            : 'linear-gradient(135deg, rgba(223, 227, 238, 0.7), rgba(255, 255, 255, 0.95))',
          
          '& fieldset': {
            borderColor: '#00fff2',
            borderWidth: '2px',
            boxShadow: '0 0 10px rgba(0, 255, 242, 0.2)',
          },
        },

        '&.Mui-focused': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.08), rgba(0, 255, 242, 0.03))'
            : 'linear-gradient(135deg, rgba(0, 255, 242, 0.1), rgba(0, 255, 242, 0.05))',
          boxShadow: darkMode
            ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 0 15px rgba(0, 255, 242, 0.2)'
            : 'inset 2px 2px 5px rgba(223, 227, 238, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.9), 0 0 20px rgba(0, 255, 242, 0.3)',
        },
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      icon: {
        color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 2, 3, 0.7)',
        transition: 'all 0.3s ease',
        
        '&.Mui-focused': {
          color: '#00fff2',
        },
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          padding: '4px 8px',
        },
      },
      paper: {
        borderRadius: '12px',
        marginTop: '8px',
        background: darkMode 
          ? 'linear-gradient(145deg, rgba(0, 2, 3, 0.95), rgba(0, 2, 3, 0.98))'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98))',
        boxShadow: darkMode
          ? '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 255, 242, 0.1)'
          : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 242, 0.1)',
      },
      option: {
        transition: 'all 0.3s ease',
        fontSize: '1.1rem',
        padding: '8px 16px',
        color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 2, 3, 0.9)',
        
        '&[aria-selected="true"]': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.15), rgba(0, 255, 242, 0.1))'
            : 'linear-gradient(135deg, rgba(0, 255, 242, 0.2), rgba(0, 255, 242, 0.15))',
          color: '#00fff2',
          textShadow: '0 0 8px rgba(0, 255, 242, 0.4)',
        },
        
        '&.Mui-focused': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.1), rgba(0, 255, 242, 0.05))'
            : 'linear-gradient(135deg, rgba(0, 255, 242, 0.15), rgba(0, 255, 242, 0.1))',
        },
        
        '&:hover': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.08), rgba(0, 255, 242, 0.03))'
            : 'linear-gradient(135deg, rgba(0, 255, 242, 0.1), rgba(0, 255, 242, 0.05))',
        },
      },
      tag: {
        borderRadius: '8px',
        background: darkMode
          ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.15), rgba(0, 255, 242, 0.1))'
          : 'linear-gradient(135deg, rgba(0, 255, 242, 0.2), rgba(0, 255, 242, 0.15))',
        color: '#00fff2',
        margin: '2px',
        padding: '4px 8px',
        
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
          color: '#00fff2',
          marginLeft: '4px',
          
          '&:hover': {
            filter: 'brightness(1.2) drop-shadow(0 0 4px rgba(0, 255, 242, 0.4))',
          },
        },
      },
      endAdornment: {
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 2, 3, 0.7)',
          transition: 'all 0.3s ease',
          
          '&:hover': {
            color: '#00fff2',
            filter: 'drop-shadow(0 0 6px rgba(0, 255, 242, 0.4))',
          },
        },
      },
    },
  },
});

