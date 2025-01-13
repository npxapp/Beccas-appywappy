import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [iconData, setIconData] = useState(null);

  return (
    <DataContext.Provider value={{ 
      iconData, 
      setIconData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);