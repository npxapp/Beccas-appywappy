export const AppBarStyles = (darkMode) => ({
    boxShadow: darkMode
        ? '0 0 20px rgba(97, 218, 251, 0.3), 0 4px 15px rgba(97, 218, 251, 0.2), inset 0 0 30px rgba(97, 218, 251, 0.1)'
        : '0px 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: darkMode ? 'rgba(97, 218, 251, 0.1) !important' : 'transparent',
    backdropFilter: darkMode ? 'blur(10px)' : 'none',
    borderBottom: darkMode ? '1px solid rgba(97, 218, 251, 0.3)' : 'none',
    transition: 'all 0.3s ease',
});

export const ToolbarStyles = () => ({
    background: 'transparent',
    padding: '8px 16px',
    zIndex: 1,
});

export const ToolbarTypographyStyles = () => ({
    flexGrow: 1,
    fontSize: '5.5vw',
    fontWeight: 700,
    color: 'rgb(97, 218, 251)',
    position: 'relative',
    display: 'inline-block',
    px: '10px',
    textShadow: '0 0 10px rgba(97, 218, 251, 0.6), 0 0 15px rgba(97, 218, 251, 0.4)',
});

export const IconButtonStyles = (darkMode) => ({
    borderRadius: '50%',
    border: darkMode ? '1px solid rgba(97, 218, 251, 0.5)' : '1px solid rgba(97, 218, 251, 0.7)',
    margin: '2px',
    padding: '4px',
    transition: 'all 0.3s ease',
});

export const IconStyles = (darkMode) => ({
    filter: darkMode ? 'drop-shadow(0 0 5px rgba(97, 218, 251, 0.5))' : 'none',
    transition: 'all 0.3s ease',
});

export const IconDragHandleButtonStyles = (darkMode) => ({
    borderRadius: '50%',
    border: darkMode ? '1px solid rgba(97, 218, 251, 0.5)' : '1px solid rgba(97, 218, 251, 0.7)',
    margin: '2px',
    padding: '4px',
    transition: 'all 0.3s ease',
});

export const IconDragHandleStyles = (darkMode) => ({
    color: darkMode ? 'rgb(97, 218, 251)' : 'rgb(97, 218, 251)',
    filter: darkMode ? 'drop-shadow(0 0 5px rgba(97, 218, 251, 0.5))' : 'none',
    transition: 'all 0.3s ease',
});