// Add this to your imports at the top of the file
import { createContext, useContext, useState } from 'react';

// Create a new context for the AppBar state
export const AppBarContext = createContext();

// Create a provider component
export const AppBarProvider = ({ children }) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  const toggleStickyBar = () => {
    setShowStickyBar(prev => !prev);
  };
  
  return (
    <AppBarContext.Provider value={{ 
      showStickyBar, 
      toggleStickyBar,
      setShowStickyBar
    }}>
      {children}
    </AppBarContext.Provider>
  );
};

// Create a custom hook for using the AppBar context
export const useAppBar = () => useContext(AppBarContext);