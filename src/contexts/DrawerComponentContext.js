import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the context
const DrawerComponentContext = createContext();

// Custom hook to use the context
export const useDrawerComponent = () => {
  const context = useContext(DrawerComponentContext);
  if (!context) {
    throw new Error('useDrawerComponent must be used within a DrawerComponentProvider');
  }
  return context;
};

// Provider component
export const DrawerComponentProvider = ({ children, initialSettings = {} }) => {
  // Default settings that match the DrawerComponent defaults
  const defaultSettings = {
    initialOpen: true,
    successCode: '4242',
    onSuccess: () => {},
    buttonBackgroundColor: 'rgba(97, 218, 251, .2)',
    buttonHoverColor: 'rgba(97, 218, 251, .6)',
    buttonActiveColor: 'rgba(97, 218, 251, .6)',
    buttonColor: undefined, // Will use the darkMode conditional default in component
    paperBackgroundColor: undefined, // Will use the darkMode conditional default in component
    enableVibration: true,
    keypadLayout: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['*', 0, '#'],
    ],
    darkMode: false,
    buttonFontSize: 'clamp(1rem, 6vh, 2rem)',
    buttonBorderRadius: '50%',
    buttonHeight: 60,
    buttonBorder: '1px solid #61dafb',
    buttonWidth: 60,
  };

  // Merge default settings with any initial settings provided
  const [settings, setSettings] = useState({ ...defaultSettings, ...initialSettings });

  // Function to update a single setting
  const updateSetting = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
  };

  // Function to update multiple settings at once
  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  // Function to reset to default settings
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Function to toggle the drawer open/closed
  const toggleDrawer = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      initialOpen: !prevSettings.initialOpen
    }));
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      darkMode: !prevSettings.darkMode
    }));
  };

  const value = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    toggleDrawer,
    toggleDarkMode
  };

  return (
    <DrawerComponentContext.Provider value={value}>
      {children}
    </DrawerComponentContext.Provider>
  );
};

DrawerComponentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialSettings: PropTypes.shape({
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
  })
};

export default DrawerComponentContext;

