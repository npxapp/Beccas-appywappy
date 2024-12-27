export const componentButtons = (darkMode, isXs) => ({
  MuiButton: {
    variants: [
      {
        props: { variant: 'customPanelSummary' },
        style: ({ theme }) => ({
          flex: '0 0 auto',
          borderRadius: 20,
          border: 'none',
          textTransform: 'none',
          fontSize: '1.2rem',
          color: theme.palette.text.secondary,
        }),
      },
      {
        props: { variant: 'customPanel' },
        style: ({ theme }) => ({
          flex: '0 0 auto',
          borderRadius: 20,
          border: 'none',
          textTransform: 'none',
          fontWeight: 400,
          fontSize: '.9rem',
          color: theme.palette.primary.contrastText,
        }),
      },
      {
        props: { variant: 'customTitle' },
        style: ({ theme }) => ({
          fontWeight: 700,
          fontSize: '3.10rem',
          fontFamily: 'kornucopiaregular',
          flex: '0 0 auto',
          marginX: 1,
          minHeight: 0,
          height: 'auto',
          letterSpacing: 'initial',
          lineHeight: 0.8,
          borderRadius: 20,
          border: 'none',
          padding: 0,
          textTransform: 'none',
          color: darkMode ? '#ffffff' : '#000000',
        }),
      },
      {
        props: { variant: 'customLink' },
        style: ({ theme }) => ({
          flex: '0 0 auto',
          marginX: 1,
          borderRadius: 20,
          border: 'none',
          textTransform: 'none',
          color: darkMode ? '#ffffff' : '#000000',
        }),
      },
      {
        props: { variant: 'filterButton' },
        style: ({ theme }) => ({
          flex: '0 0 auto',
          marginX: 1,
          borderRadius: 20,
          textTransform: 'none',
          color: '#000000',
          '&.Mui-selected': {
            backgroundColor: 'transparent',
          },
          '&:not(.Mui-selected)': {
            backgroundColor: 'transparent',
          },
        }),
      },
    ],
    styleOverrides: {
      outlined: {
        '&.demo-button': {
          flexGrow: 1,
          borderRadius: '20px',
          padding: 11,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
            border: 'none',
          },
          '&.selected': {
            backgroundColor: 'transparent',
          },
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