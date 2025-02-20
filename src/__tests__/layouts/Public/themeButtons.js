// ./src/layouts/themeButtons.js
export const componentButtons = (darkMode, isXs) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: '1.1rem',
        letterSpacing: '0.5px',
        padding: '8px 24px',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        background: darkMode 
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(223, 227, 238, 0.6))',
        boxShadow: darkMode
          ? 'inset 1px 1px 2px rgba(0, 0, 0, 0.2), inset -1px -1px 2px rgba(255, 255, 255, 0.05)'
          : 'inset 1px 1px 3px rgba(223, 227, 238, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.8)',
        color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 2, 3, 0.9)',
        textTransform: 'none',
        '&:hover': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))'
            : 'linear-gradient(135deg, rgba(223, 227, 238, 0.7), rgba(255, 255, 255, 0.95))',
          boxShadow: darkMode
            ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 0 15px rgba(0, 255, 242, 0.2)'
            : 'inset 2px 2px 5px rgba(223, 227, 238, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.9), 0 0 20px rgba(223, 227, 238, 0.5)',
          color: '#00fff2',
          textShadow: '0 0 8px rgba(0, 255, 242, 0.6)',
        },
        '&:active': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05))'
            : 'linear-gradient(135deg, rgba(223, 227, 238, 0.6), rgba(255, 255, 255, 0.9))',
          boxShadow: darkMode
            ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -1px -1px 4px rgba(255, 255, 255, 0.05), 0 0 20px rgba(0, 255, 242, 0.3)'
            : 'inset 3px 3px 7px rgba(223, 227, 238, 0.9), inset -1px -1px 5px rgba(255, 255, 255, 1), 0 0 25px rgba(223, 227, 238, 0.6)',
        },
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
          marginRight: '8px',
          transition: 'all 0.3s ease',
          filter: darkMode 
            ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))'
            : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.1))',
        },
      },
      contained: {
        background: darkMode
          ? 'linear-gradient(145deg, rgba(0, 255, 242, 0.15), rgba(0, 255, 242, 0.05))'
          : 'linear-gradient(145deg, rgba(0, 255, 242, 0.8), rgba(0, 255, 242, 0.6))',
        color: darkMode ? '#00fff2' : '#003833',
        '&:hover': {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(0, 255, 242, 0.2), rgba(0, 255, 242, 0.1))'
            : 'linear-gradient(135deg, rgba(0, 255, 242, 0.9), rgba(0, 255, 242, 0.7))',
          boxShadow: '0 0 20px rgba(0, 255, 242, 0.4)',
        },
      },
    },
  },
  MuiIconButton: {
    variants: [
      {
        props: { variant: 'footer' },
        style: ({ theme }) => ({
          zIndex: 1501,
          color: darkMode ? '#ffffff' : '#000000',
        }),
      },
      {
        props: { variant: 'panel' },
        style: ({ theme }) => ({
          zIndex: 1501,
          color: darkMode ? '#ffffff' : '#000000',
        }),
      },
      {
        props: { variant: 'arrowButton' },
        style: ({ theme }) => ({
          zIndex: 2001,
          color: darkMode ? '#ffffff' : '#000000',
        }),
      },
      {
        props: { variant: 'arrowSwitch' },
        style: ({ theme }) => ({
          color: darkMode ? '#ffffff' : '#000000',
        }),
      },
      {
        props: { variant: 'arrowSwitchX' },
        style: ({ theme }) => ({
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          color: theme.palette.primary.main,
        }),
      },
    ],
  },
});