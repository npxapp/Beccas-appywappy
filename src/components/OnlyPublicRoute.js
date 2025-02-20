// components/OnlyPublicRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const OnlyPublicRoute = ({ element: Component, ...rest }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Component {...rest} />;
};

