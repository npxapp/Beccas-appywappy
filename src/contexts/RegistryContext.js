import React, { createContext, useContext, useState } from 'react';

const RegistryContext = createContext();

export const RegistryProvider = ({ children }) => {

  const [registries, setRegistries] = useState(null);
  const [filteredRegistries, setFilteredRegistries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('5');
  const [selectedRegistry, setSelectedRegistry] = useState(null);

  return (
    <RegistryContext.Provider
      value={{
        registries,
        setRegistries,
        filteredRegistries,
        setFilteredRegistries,
        selectedFilter,
        setSelectedFilter,
        selectedRegistry,
        setSelectedRegistry,
      }}
    >
      {children}
    </RegistryContext.Provider>
  );
};

export const useRegistry = () => {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error('useRegistry must be used within a RegistryProvider');
  }
  return context;
};