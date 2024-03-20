import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// ----------------------------------------------------------------------------------

const ProtectedRouteHandler = ({ allowedRoles, allowedPermissions }) => {
  const location = useLocation();

  const { isUserLoggedIn, loggedInUserData } = useAuth();

  return (isUserLoggedIn &&
    loggedInUserData?.role?.toString()?.toUpperCase() === 'SUPER_ADMIN') ||
    (isUserLoggedIn &&
      allowedRoles?.includes(
        loggedInUserData?.role?.toString()?.toUpperCase()
      ) &&
      loggedInUserData?.permissions?.find((permission) =>
        allowedPermissions?.includes(permission)
      )) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRouteHandler;
