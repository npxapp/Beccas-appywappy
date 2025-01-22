export const componentPapers = (darkMode, isXs) => ({
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 40,
        background: darkMode
          ? `linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.95) 100%)`
          : `linear-gradient(135deg, rgba(20,86,97,0.65) 0%, rgba(2,13,16,0.85) 100%)`,
        boxShadow:
          '0 0 20px rgba(97, 218, 251, 0.3), 0 4px 15px rgba(97, 218, 251, 0.2), inset 0 0 30px rgba(97, 218, 251, 0.1)',
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 80,
        border: 'none',
        boxShadow:
          '0 0 20px rgba(97, 218, 251, 0.3), 0 4px 15px rgba(97, 218, 251, 0.2), inset 0 0 30px rgba(97, 218, 251, 0.1)',
        backgroundColor: 'rgba(97, 218, 251, 0.1) !important',
        borderBottom: '1px solid rgba(97, 218, 251, 0.3)',
        transition: 'all 0.3s ease',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, rgba(20,86,97,0.65) 0%, rgba(2,13,16,0.85) 100%)`,
        borderRadius: 80,
        boxShadow:
          'inset 0px 30px 30px rgba(255, 255, 255, 0.15), 0px 0px 20px rgba(0, 2, 3, 0.85), 0px 0px 30px rgba(255, 255, 255, 0.15)',
      },
    },
  },
  MuiSnackbarContent: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(30px)',
        boxShadow:
          '0 0 20px rgba(97, 218, 251, 0.3), 0 4px 15px rgba(97, 218, 251, 0.2), inset 0 0 30px rgba(97, 218, 251, 0.1)',
        background: 'rgba(97, 218, 251, 0.1)',
      },
    },
  },
});