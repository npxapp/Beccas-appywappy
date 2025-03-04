import React, { createContext, useContext, useState } from 'react';

const ScrolledContext = createContext();

export const ScrolledProvider = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrolledContext.Provider value={{ scrolled, setScrolled }}>
      {children}
    </ScrolledContext.Provider>
  );
};

export const useScrolled = () => useContext(ScrolledContext);