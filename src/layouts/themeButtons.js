export const componentButtons = (darkMode, isXs) => ({
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