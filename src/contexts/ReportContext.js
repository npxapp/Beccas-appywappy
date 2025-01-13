import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};

export const ReportProvider = ({ children }) => {
  const [isReportBuilding, setIsReportBuilding] = useState(false);
  const [reportType, setReportType] = useState('software'); // 'software' or 'realestate'
  const [reportStages, setReportStages] = useState([
    { stage: 'Preparing', active: false },
    { stage: 'Gathering Data', active: false },
    { stage: 'Analyzing', active: false },
    { stage: 'Completed', active: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // New state variables
  const [processingState, setProcessingState] = useState('idle');
  const [focusState, setFocusState] = useState(false);

  const resetReport = () => {
    setIsReportBuilding(false);
    setReportStages([
      { stage: 'Preparing', active: false },
      { stage: 'Gathering Data', active: false },
      { stage: 'Analyzing', active: false },
      { stage: 'Completed', active: false },
    ]);
    setSearchTerm('');
    setLoading(false);
    setProcessingState('idle'); // Reset processing state
    setFocusState(false); // Reset focus state
  };

  const startReport = (type, term) => {
    setReportType(type);
    setSearchTerm(term);
    setIsReportBuilding(true);
  };

  return (
    <ReportContext.Provider
      value={{
        isReportBuilding,
        setIsReportBuilding,
        reportType,
        setReportType,
        reportStages,
        setReportStages,
        searchTerm,
        setSearchTerm,
        loading,
        setLoading,
        resetReport,
        startReport,
        processingState, // Add processing state
        setProcessingState, // Add setter for processing state
        focusState, // Add focus state
        setFocusState, // Add setter for focus state
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};