import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  
  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

