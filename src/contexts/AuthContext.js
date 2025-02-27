// contexts/AuthContext.js
import React, { createContext, useContext, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Me } from 'api/queries';
import { isAccountActive } from "libs/utils";
import i18next from "libs/i18n";
//import { Login, Register, Logout } from 'Utils/mutations';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Add state for all our auth values
  const [userData, setUserData] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authError, setAuthError] = useState(null);

  const { isLoading, refetch } = useQuery("Me", Me, {
    retry: false,
    onSuccess: (responseData) => {
      //alert('Query Success Data: ' + JSON.stringify(responseData));
      // Set language just like in HOC
      if (responseData?.data?.language) {
        i18next.changeLanguage(responseData.data.language);
      }
      // Update our state values
      setUserData(responseData.data);
      setIsAuthed(true);
      setUserRole(responseData.data?.role || null);
      setAuthError(null);
    },
    onError: (err) => {
      //alert('Query Error: ' + JSON.stringify(err));
      setUserData(null);
      setIsAuthed(false);
      setUserRole(null);
      setAuthError(err);
    }
  });

  // Add helper functions for role and access checking with safe data access
  const hasRole = useCallback((allowedRoles) => {
    if (!userData?.role || !Array.isArray(allowedRoles)) return false;
    return allowedRoles.includes(userData.role);
  }, [userData]);

  const hasPlanType = useCallback((allowedPlanTypes) => {
    if (!userData?.account?.planType || !Array.isArray(allowedPlanTypes)) return false;
    return allowedPlanTypes.includes(userData.account.planType);
  }, [userData]);

  const isActive = useCallback(() => {
    if (!userData?.account) return false;
    return isAccountActive(userData.account);
  }, [userData]);

  // Construct value object using our state values
  const value = {
    user: userData,
    isLoading,
    error: authError,
    isAuthenticated: isAuthed,
    role: userRole,
    hasRole,
    hasPlanType,
    isActive,
    refetch,
    // Add setters in case we need them elsewhere
    setUserData,
    setIsAuthed,
    setUserRole,
    setAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};