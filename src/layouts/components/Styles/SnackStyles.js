export const AppBarStyles = (darkMode) => ({
    position: 'fixed',
    bottom: 0,
    top: 'auto',
    left: 0,
    right: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: darkMode 
        ? 'rgba(97, 218, 251, 0.1) !important' 
        : 'primary.main !important',
    backdropFilter: darkMode ? 'blur(10px)' : 'none',
    paddingY: 2,
    transition: 'all 0.3s ease',
    zIndex: 1000,
    '&.MuiAppBar-root': {
        backgroundColor: darkMode 
            ? 'rgba(97, 218, 251, 0.1) !important' 
            : 'primary.main !important',
    },
});

export const ToolbarStyles = (darkMode) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    backgroundColor: 'transparent',
    '&.MuiToolbar-root': {
        backgroundColor: 'transparent',
    },
});

export const TypographyStyles = (darkMode) => ({
    whiteSpace: 'nowrap',
    flexGrow: 1,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    transition: 'all 0.3s ease',
});

export const IconButtonStyles = (darkMode) => ({
    marginLeft: 2,
    color: darkMode ? 'rgb(97, 218, 251)' : 'inherit',
    transition: 'all 0.3s ease',
});