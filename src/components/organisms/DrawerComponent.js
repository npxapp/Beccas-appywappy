// components/DrawerComponent.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box,
  Drawer,
  Button
} from '@mui/material';
import PropTypes from 'prop-types';

const DrawerComponent = ({ 
  // Optional props with defaults that match original implementation
  initialOpen = true,
  successCode = '4242',
  onSuccess = () => {}, // Optional callback when code succeeds
  buttonBackgroundColor = 'rgba(97, 218, 251, .2)',
  buttonHoverColor = 'rgba(97, 218, 251, .6)',
  buttonActiveColor = 'rgba(97, 218, 251, .6)',
  buttonColor,
  paperBackgroundColor,
  enableVibration = true,
  keypadLayout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['*', 0, '#'],
  ],
  darkMode = false,
  buttonFontSize = 'clamp(1rem, 6vh, 2rem)',
  buttonBorderRadius = '50%',
  buttonHeight = 60,
  buttonBorder = '1px solid #61dafb',
  buttonWidth = 60
}) => {
  const [drawerOpen, setDrawerOpen] = useState(initialOpen);
  const [inputCode, setInputCode] = useState('');
  const [buttonAnimationKeys, setButtonAnimationKeys] = useState({});
  const [animationState, setAnimationState] = useState(false);
  const [globalAnimationKey, setGlobalAnimationKey] = useState(0);

  const triggerVibration = () => {
    if (enableVibration && navigator.vibrate) {
      navigator.vibrate(35);
    }
  };

  const handleButtonPress = (value) => {
    let newCode = inputCode + value.toString();

    triggerVibration();

    setButtonAnimationKeys((prev) => ({
      ...prev,
      [value]: (prev[value] || 0) + 1,
    }));

    if (newCode === successCode) {
      setDrawerOpen(false);
      setAnimationState(false);
      setInputCode('');
      onSuccess(); // Call optional success callback
      return;
    }

    setInputCode(newCode);
  };

  useEffect(() => {
    if (inputCode.length === 4 && inputCode !== successCode) {
      setGlobalAnimationKey((prev) => prev + 1);
      setAnimationState(true);
      setInputCode('');
    }
  }, [inputCode, successCode]);

  return (
    <Drawer
      anchor="top"
      open={drawerOpen}
      variant="temporary"
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
      }}
      PaperProps={{
        sx: {
          backgroundColor: paperBackgroundColor || (darkMode ? 'rgba(0, 0, 0, 1) !important' : 'rgba(255, 255, 255, 1) !important'),
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {keypadLayout.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 1,
            }}
          >
            {row.map((value) => {
              const individualAnimation = buttonAnimationKeys[value]
                ? `pulse-button-${buttonAnimationKeys[value]}`
                : '';
              const globalAnim = animationState
                ? `pulse-global-${globalAnimationKey}`
                : '';
              const combinedAnimation = globalAnim || individualAnimation;

              return (
                <Button
                  key={value}
                  variant="outlined"
                  sx={{
                    backgroundColor: buttonBackgroundColor,
                    '&:active': { backgroundColor: buttonActiveColor },
                    '&:hover': { backgroundColor: buttonHoverColor },
                    '&:focus': { animation: 'pulse 2.5s' },
                    color: buttonColor || (darkMode ? '#61dafb' : '#007fff'),
                    fontSize: buttonFontSize,
                    borderRadius: buttonBorderRadius,
                    height: buttonHeight,
                    border: buttonBorder,
                    width: buttonWidth,
                    mx: 1,
                    animation: combinedAnimation
                      ? `${combinedAnimation} 2.5s`
                      : 'none',
                  }}
                  onClick={() => handleButtonPress(value)}
                >
                  {value}
                </Button>
              );
            })}
          </Box>
        ))}
        <style jsx>{`
          ${[...Array(100)]
            .map(
              (_, i) => `
            @keyframes pulse-button-${i} {
              0% {
                background-color: ${buttonBackgroundColor};
              }
              20% {
                background-color: ${buttonHoverColor};
              }
              100% {
                background-color: ${buttonBackgroundColor};
              }
            }
            @keyframes pulse-global-${i} {
              0% {
                background-color: ${buttonBackgroundColor};
              }
              20% {
                background-color: ${buttonHoverColor};
              }
              100% {
                background-color: ${buttonBackgroundColor};
              }
            }
          `
            )
            .join('\n')}
        `}</style>
      </Box>
    </Drawer>
  );
};

DrawerComponent.propTypes = {
  initialOpen: PropTypes.bool,
  successCode: PropTypes.string,
  onSuccess: PropTypes.func,
  buttonBackgroundColor: PropTypes.string,
  buttonHoverColor: PropTypes.string,
  buttonActiveColor: PropTypes.string,
  buttonColor: PropTypes.string,
  paperBackgroundColor: PropTypes.string,
  enableVibration: PropTypes.bool,
  keypadLayout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))),
  darkMode: PropTypes.bool,
  buttonFontSize: PropTypes.string,
  buttonBorderRadius: PropTypes.string,
  buttonHeight: PropTypes.number,
  buttonBorder: PropTypes.string,
  buttonWidth: PropTypes.number
};

export default DrawerComponent;