// contexts/DashboardDrawerContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DashboardDrawerContext = createContext();

export const DashboardDrawerProvider = ({ children }) => {
  const [dashboardDrawerOpen, setDashboardDrawerOpen] = useState(false);

  // Update toggleDrawer to toggle the state
  const toggleDashboardDrawer = (state) => {
    setDashboardDrawerOpen(state);
  };

  return (
    <DashboardDrawerContext.Provider value={{ dashboardDrawerOpen, toggleDashboardDrawer }}>
      {children}
    </DashboardDrawerContext.Provider>
  );
};

export const useDashboardDrawer = () => {
  const context = useContext(DashboardDrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerMode Provider');
  }
  return context;
};