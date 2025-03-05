// contexts/PrivateRouteContext.js
import React, { createContext, useContext, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, Navigate } from 'react-router-dom';
import { Me } from 'api/queries';
import { isAccountActive } from "libs/utils";
import i18next from "libs/i18n";
//import { Login, Register, Logout } from 'Utils/mutations';

const PrivateRouteContext = createContext(null);

export const PrivateRouteProvider = ({ children }) => {
  const { isLoading, error, data, refetch } = useQuery("Me", Me, {
    retry: false,
    onSuccess: (responseData) => {
      //alert('Query Success Data: ' + JSON.stringify(responseData));
      // Set language just like in HOC
      if (responseData.data?.language) {
        i18next.changeLanguage(responseData.data.language);
      }
    },
    onError: (err) => {
      //alert('Query Error: ' + JSON.stringify(err));
    }
  });
  
  //const login = useCallback(async (username, password) => {
    //try {
      //await Login({ username, password });
      //await refetch();
      //return true;
    //} catch (error) {
      //throw new Error(error.response?.data?.error || 'Login failed');
    //}
  //}, [refetch]);

  //const register = useCallback(async (username, password) => {
    //try {
      //await Register({ username, password });
      //await refetch();
      //return true;
    //} catch (error) {
      //throw new Error(error.response?.data?.error || 'Registration failed');
    //}
  //}, [refetch]);

  //const logout = useCallback(async () => {
    //await Logout();
    //refetch();
  //}, [refetch]);

  const location = useLocation();
  const [allowedRoles, setAllowedRoles] = useState([]);
  const [planType, setPlanType] = useState([]);

  // Repeated if conditions to set allowedRoles based on the location
  if (location.pathname === "/DashboardTest") {
    setAllowedRoles(["admin", "user"]);
  }
  if (location.pathname === "/teams") {
    setAllowedRoles(["admin", "user"]);
  }
  if (location.pathname === "/teams/:teamId") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/user-teams") {
    setAllowedRoles(["user"]);
  }
  if (location.pathname === "/card/add") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/plan/:planId/subscribe") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/plan") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/user/edit") {
    setAllowedRoles(["admin", "user"]);
  }
  if (location.pathname === "/account/edit") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/users") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/create-user") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/edit-user/:userId") {
    setAllowedRoles(["admin"]);
  }
  if (location.pathname === "/user/:userId") {
    setAllowedRoles(["admin"]);
  }

  if (location.pathname === "/users") {
    setPlanType(["starter", "basic", "premium"]);
  }
  if (location.pathname === "/user/:userId") {
    setPlanType(["premium"]);
  }

  // Add helper functions for role and access checking
  const hasRole = useCallback((allowedRoles) => {
    if (!data?.data) return false;
    return allowedRoles.includes(data.data.role);
  }, [data]);

  const hasPlanType = useCallback((allowedPlanTypes) => {
    if (!data?.data?.account) return false;
    return allowedPlanTypes.includes(data.data.account.planType);
  }, [data]);

  const isActive = useCallback(() => {
    if (!data?.data?.account) return false;
    return isAccountActive(data.data.account);
  }, [data]);

  const value = {
    user: data?.data || null,
    isLoading,
    error,
    isAuthenticated: !error && !!data?.data,
    role: data?.data?.role || null,
    hasRole,
    hasPlanType,
    isActive,
    refetch,
    allowedRoles,
    planType
  };

  return (
    <PrivateRouteContext.Provider value={value}>
      {children}
    </PrivateRouteContext.Provider>
  );
};

export const usePrivateRoute = () => {
  const context = useContext(PrivateRouteContext);
  if (context === undefined) {
    throw new Error('usePrivateRoute must be used within a PrivateRouteProvider');
  }
  return context;
};

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, allowedRoles, planType } = usePrivateRoute();

  let allowed = isAuthenticated && user && allowedRoles.includes(user.role);

  if (planType && planType.length > 0) {
    allowed = allowed && planType.includes(user.account.planType);
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: "/auth/login",
          state: { from: location }
        }}
        replace
      />
    );
  }

  if (!allowed) {
    return (
      <Navigate
        to={{
          pathname: "/dashboard",
          state: { from: location }
        }}
        replace
      />
    );
  }

  return children;
};

