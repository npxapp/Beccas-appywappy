// contexts/DarkMode.jsx
import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const DarkMode = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkMode Provider');
  }
  return context;
};






