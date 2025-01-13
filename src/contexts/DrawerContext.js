// ./src/contexts/DrawerContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const DrawerContext = createContext();

// Custom hook to use the DrawerContext
export const useDrawer = () => {
  return useContext(DrawerContext);
};

// Provider component
export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  
  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

