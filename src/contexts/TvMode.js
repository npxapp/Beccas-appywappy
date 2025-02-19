// contexts/TvMode.jsx
import React, { createContext, useContext, useState } from 'react';

const TvModeContext = createContext();

export const TvMode = ({ children }) => {
  const [tvMode, setTvMode] = useState(true);

  return (
    <TvModeContext.Provider value={{ tvMode, setTvMode }}>
      {children}
    </TvModeContext.Provider>
  );
};

export const useTvMode = () => {
  const context = useContext(TvModeContext);
  if (context === undefined) {
    throw new Error('useTvMode must be used within a TvMode Provider');
  }
  return context;
};