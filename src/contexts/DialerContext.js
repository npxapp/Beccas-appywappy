import React, { createContext, useContext, useState } from 'react';

const DialerContext = createContext();

export const DialerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [dialerState, setDialerState] = useState({ dialerCode: null, version: 0 });

  const setDialerCode = (code) => {
    setDialerState((prev) => ({
      ...prev,
      dialerCode: code,
      version: prev.version + 1,
    }));
  };

  return (
    <DialerContext.Provider 
      value={{ 
        loading,
        setLoading,
        dialerCode: dialerState.dialerCode, // Expose only dialerCode
        setDialerCode,
        version: dialerState.version,
      }}
    >
      {children}
    </DialerContext.Provider>
  );
};

export const useDialer = () => {
  const context = useContext(DialerContext);
  if (context === undefined) {
    throw new Error('useDialer must be used within a DialerProvider');
  }
  return context;
};