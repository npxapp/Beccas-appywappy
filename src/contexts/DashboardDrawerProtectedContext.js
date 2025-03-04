// contexts/DashboardDrawerProtectedContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DashboardDrawerProtectedContext = createContext();

export const DashboardDrawerProtectedProvider = ({ children }) => {
  const [dashboardDrawerProtectedOpen, setDashboardDrawerProtectedOpen] = useState(false);

  // Updated toggleDashboardDrawerProtected to toggle the state
  const toggleDashboardDrawerProtected = () => {
    setDashboardDrawerProtectedOpen(prevState => !prevState);
  };

  return (
    <DashboardDrawerProtectedContext.Provider value={{ dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected }}>
      {children}
    </DashboardDrawerProtectedContext.Provider>
  );
};

export const useDashboardDrawerProtected = () => {
  const context = useContext(DashboardDrawerProtectedContext);
  if (context === undefined) {
    throw new Error('useDashboardDrawerProtected must be used within a DashboardDrawerProtectedProvider');
  }
  return context;
};