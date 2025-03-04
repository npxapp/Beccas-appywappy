// contexts/RolesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const location = useLocation();
  const [allowedRoles, setAllowedRoles] = useState([]);

  useEffect(() => {
    if (location.pathname === "/DashboardTest") {
      setAllowedRoles(["admin", "user"]);
    } else if (location.pathname === "/teams") {
      setAllowedRoles(["admin", "user"]);
    } else if (location.pathname === "/teams/:teamId") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/user-teams") {
      setAllowedRoles(["user"]);
    } else if (location.pathname === "/card/add") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/plan/:planId/subscribe") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/plan") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/user/edit") {
      setAllowedRoles(["admin", "user"]);
    } else if (location.pathname === "/account/edit") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/users") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/create-user") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/edit-user/:userId") {
      setAllowedRoles(["admin"]);
    } else if (location.pathname === "/user/:userId") {
      setAllowedRoles(["admin"]);
    }
  }, [location.pathname]);

  return (
    <RolesContext.Provider value={allowedRoles}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => {
  return useContext(RolesContext);
};

