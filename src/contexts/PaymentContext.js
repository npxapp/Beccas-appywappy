import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {

  const [sessionId, setSessionId] = useState(null);
  const [payments, setPayments] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('5');
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <PaymentContext.Provider
      value={{
        sessionId,
        setSessionId,
        payments,
        setPayments,
        filteredPayments,
        setFilteredPayments,
        selectedFilter,
        setSelectedFilter,
        selectedPayment,
        setSelectedPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};