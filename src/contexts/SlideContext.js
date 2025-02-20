// contexts/SlideContext.jsx
import React, { createContext, useContext, useState } from 'react';

const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
  // Shared slide-related state
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);

  return (
    <SlideContext.Provider 
      value={{
        loading,
        setLoading,
        activeSlide,
        setActiveSlide,
        previousSlide,
        setPreviousSlide,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};

// Custom hook to use the SlideContext
export const useSlide = () => {
  const context = useContext(SlideContext);
  if (!context) {
    throw new Error('useSlide must be used within a SlideProvider');
  }
  return context;
};

