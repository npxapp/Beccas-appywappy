// src/contexts/YiMode.js
import React, { createContext, useContext, useState } from 'react';

const YiModeContext = createContext();

export const YiMode = ({ children }) => {
  const [yiMode, setYiMode] = useState(true);

  return (
    <YiModeContext.Provider value={{ yiMode, setYiMode }}>
      {children}
    </YiModeContext.Provider>
  );
};

export const useYiMode = () => {
  const context = useContext(YiModeContext);
  if (context === undefined) {
    throw new Error('useYiMode must be used within a YiMode Provider');
  }
  return context;
};

