import React, { createContext, useContext, useState } from 'react';

const CollapseContext = createContext();

export const CollapseProvider = ({ children }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen((prev) => !prev);
  };
  
  return (
    <CollapseContext.Provider value={{ isCollapseOpen, toggleCollapse }}>
      {children}
    </CollapseContext.Provider>
  );
};

export const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error('useCollapse must be used within a CollapseProvider');
  }
  return context;
};