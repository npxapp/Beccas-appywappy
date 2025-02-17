// components/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoles } from 'contexts/RolesContext';
import { usePlanType } from 'contexts/PlanTypeContext';
import { useAuth } from 'contexts/AuthContext';
import { ACCOUNT_STATUSES } from '../config';  // Add this import

export const PrivateRoute = ({ element: Component, ...rest }) => {
  //alert(true);
  
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const allowedRoles = useRoles();
  const planType = usePlanType();

  let allowed = isAuthenticated && user && allowedRoles.includes(user.role);

  if (planType && planType.length > 0) {
    allowed = allowed && planType.includes(user.account.planType);
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (!allowed) {
    //alert(`isAuthenticated: ${JSON.stringify(isAuthenticated)}, user.role in allowedRoles: ${JSON.stringify(allowedRoles.includes(user?.role))}, planType check: ${JSON.stringify(!planType.length || planType.includes(user?.account?.planType))}, Account data: ${JSON.stringify(user?.account)}, Account status: ${JSON.stringify(user?.account?.subscriptionStatus)}, ACCOUNT_STATUSES: ${JSON.stringify(ACCOUNT_STATUSES)}`);
    return (
      <Navigate
        to="/dashboard"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return (
    <Component {...rest} />
  );
};

