export const componentPapers = (darkMode, isXs) => ({
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
          borderRadius: 0,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
          transition: 'background 3s ease',
          border: 'none !important',
        }),
      },
    ],
    styleOverrides: {
      root: ({ theme }) => ({
        backdropFilter: 'blur(30px)',
        borderRadius: 40,
        boxShadow: '0 0 20px rgba(97, 218, 251, 0.3), 0 4px 15px rgba(97, 218, 251, 0.2), inset 0 0 30px rgba(97, 218, 251, 0.1)',
        background: 'rgba(97, 218, 251, 0.1)',
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 80,
        border: 'none',
        boxShadow: '0 0 20px rgba(97, 218, 251, 0.3), 0 4px 15px rgba(97, 218, 251, 0.2), inset 0 0 30px rgba(97, 218, 251, 0.1)',
        backgroundColor: 'rgba(97, 218, 251, 0.1) !important',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(97, 218, 251, 0.3)',
        transition: 'all 0.3s ease',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        background: 'rgba(0, 2, 3, 0.05)',
        backdropFilter: 'blur(50px)',
        borderRadius: 80,
        boxShadow: 'inset 0px 30px 30px rgba(255, 255, 255, 0.15), 0px 0px 20px rgba(0, 2, 3, 0.85), 0px 0px 30px rgba(255, 255, 255, 0.15)',
      },
    },
  },
});