// ./src/layouts/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the attempted URL
    return <Navigate to="/Auth" state={{ from: location.pathname }} replace />;
  }

  return <Component {...rest} />;
};

