import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { useDarkMode } from 'contexts/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import DrawerComponent from 'components/organisms/DrawerComponent';
import MobileDrawerComponent from 'components/organisms/MobileDrawerComponent';
import { DrawerComponentProvider, useDrawerComponent } from 'src/contexts/DrawerComponentContext';

// Styles for the fixed buttons
const iconButtonStyles = (darkMode) => ({
  position: 'fixed',
  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
  }
});

const iconStyles = (darkMode) => ({
  color: darkMode ? '#61dafb' : '#007fff',
  fontSize: '1.5rem'
});

const DemoPage = () => {
  // Get dark mode context
  const { darkMode, setDarkMode } = useDarkMode();
  
  // State for the control panel drawer
  const [controlsOpen, setControlsOpen] = useState(false);
  
  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // Handle successful code entry
  const handleSuccess = () => {
    console.log('Success code entered correctly!');
  };

  return (
    <DrawerComponentProvider initialSettings={{ 
      initialOpen: true,
      successCode: '0000',
      darkMode: darkMode,
      onSuccess: handleSuccess
    }}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: darkMode ? '#121212' : '#f5f5f5',
          transition: 'background-color 0.3s ease'
        }}
      >
        {/* Theme toggle button (top right) */}
        <IconButton
          color="primary"
          onClick={toggleTheme}
          sx={{
            ...iconButtonStyles(darkMode),
            top: 16,
            right: 16,
          }}
        >
          {darkMode ? (
            <DarkModeIcon sx={iconStyles(darkMode)} />
          ) : (
            <LightModeIcon sx={iconStyles(darkMode)} />
          )}
        </IconButton>
        
        {/* Controls toggle button (bottom right) */}
        <IconButton
          color="primary"
          onClick={() => setControlsOpen(true)}
          sx={{
            ...iconButtonStyles(darkMode),
            bottom: 16,
            right: 16,
          }}
        >
          <ColorLensOutlinedIcon sx={iconStyles(darkMode)} />
        </IconButton>
        
        {/* Main Drawer Component */}
        <DrawerComponent 
          initialOpen={true}
          successCode={'0000'}
          onSuccess={handleSuccess}
          buttonBackgroundColor={'rgba(97, 218, 251, .2)'}
          buttonHoverColor={'rgba(97, 218, 251, .6)'}
          buttonActiveColor={'rgba(97, 218, 251, .6)'}
          paperBackgroundColor={undefined}
          enableVibration={true}
          keypadLayout={[
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            ['*', 0, '#'],
          ]}
          darkMode={darkMode}
          buttonFontSize={'clamp(1rem, 6vh, 2rem)'}
          buttonBorderRadius={'50%'}
          buttonHeight={60}
          buttonBorder={'1px solid #61dafb'}
          buttonWidth={60}
        />
        
        {/* Controls Drawer */}
        <MobileDrawerComponent
          open={controlsOpen}
          onClose={() => setControlsOpen(false)}
        />
      </Box>
    </DrawerComponentProvider>
  );
};

export default DemoPage;

