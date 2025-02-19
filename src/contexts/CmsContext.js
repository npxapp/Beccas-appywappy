// contexts/CmsContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const CmsContext = createContext(null);

export const CmsProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [previewData, setPreviewData] = useState({
    pages: [],
    posts: [],
    links: [],
    options: []
  });
  const [apiInstance, setApiInstance] = useState(null);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const loadTables = useCallback(async () => {
    try {
      const tablesData = await apiInstance.getTables();
      setTables(tablesData);
    } catch (err) {
      console.error('Failed to load tables:', err);
      throw new Error('Failed to load tables');
    }
  }, [apiInstance]);

  const loadPreviewData = useCallback(async () => {
    try {
      const data = await apiInstance.getPreviewData();
      setPreviewData(data);
    } catch (err) {
      console.error('Failed to load preview data:', err);
      throw new Error('Failed to load preview data');
    }
  }, [apiInstance]);

  const handleRefresh = useCallback(async () => {
    try {
      setLoading(true);
      await loadTables();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadTables]);
  
const initializeDashboard = useCallback(async (api) => {
  try {
    
    try {
      setLoading(true);
      setApiInstance(api); // Store API instance for later use

      await Promise.all([loadTables(), loadPreviewData()]);
    } catch (err) {
      console.error("Error during dashboard initialization:", err.message);
    }
  } catch (err) {
    console.log(err.message + " " + JSON.stringify(api)); // Alert and log invalid API instance
  } finally {
    setLoading(false);
  }
}, [loadTables, loadPreviewData]);
  
  const value = {
    // State
    tables,
    selectedTable,
    loading,
    error,
    tabValue,
    previewData,
    
    // Setters
    setTables,
    setSelectedTable,
    setLoading,
    setError,
    setTabValue,
    setPreviewData,
    
    // Handlers
    handleTabChange,
    handleRefresh,
    initializeDashboard
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (context === null) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};