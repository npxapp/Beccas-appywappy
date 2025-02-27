// contexts/PlanTypeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PlanTypeContext = createContext();

export const PlanTypeProvider = ({ children }) => {
  const location = useLocation();
  const [planType, setPlanType] = useState([]);

  useEffect(() => {
    if (location.pathname === "/users") {
      setPlanType(["basic", "premium", "pro"]);
    } else if (location.pathname === "/user/:userId") {
      setPlanType(["premium"]);
    } else {
      setPlanType([]);
    }
  }, [location.pathname]);

  return (
    <PlanTypeContext.Provider value={planType}>
      {children}
    </PlanTypeContext.Provider>
  );
};

export const usePlanType = () => {
  return useContext(PlanTypeContext);
};

