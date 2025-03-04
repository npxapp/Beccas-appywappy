// routes/PrivateActiveRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoles } from '../contexts/RolesContext';
import { usePlanType } from '../contexts/PlanTypeContext';
import { useAuth } from '../contexts/AuthContext';
import { isAccountActive } from '../libs/utils';

export const PrivateActiveRoute = ({ element: Component, ...rest }) => {
  //alert(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const allowedRoles = useRoles();
  const planType = usePlanType();

  if (!isAuthenticated) {
    //alert(true);
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  const allowed = isAuthenticated && 
    user && 
    allowedRoles.includes(user.role) && 
    (!planType.length || planType.includes(user.account.planType)) &&
    isAccountActive(user.account);

  if (!allowed) {
    //alert(`isAuthenticated: ${JSON.stringify(isAuthenticated)}, user.role in allowedRoles: ${JSON.stringify(allowedRoles.includes(user?.role))}, planType check: ${JSON.stringify(!planType.length || planType.includes(user?.account?.planType))}, account active: ${JSON.stringify(isAccountActive(user?.account))}, Account data: ${JSON.stringify(user?.account)}, Account status: ${JSON.stringify(user?.account?.subscriptionStatus)}, ACCOUNT_STATUSES: ${JSON.stringify(ACCOUNT_STATUSES)}`);
    return (
      <Navigate
        to="/plan"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Component {...rest} />;
};

