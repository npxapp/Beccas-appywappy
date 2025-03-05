// contexts/AccordionContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AccordionContext = createContext();

export const useAccordionContext = () => {
  return useContext(AccordionContext);
};

export const AccordionProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <AccordionContext.Provider value={{ expanded, handleChange }}>
      {children}
    </AccordionContext.Provider>
  );
};

