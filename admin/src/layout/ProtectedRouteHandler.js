// -----------------------------------------------Imports-------------------------------------------------------
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// -------------------------------------------------------------------------------------------------------------

const ProtectedRouteHandler = ({ allowedRoles, allowedSubRoles }) => {
  // ---------------------------------------------Hooks-------------------------------------------------------
  const { loggedInUserData, isUserLoggedIn } = useSelector(
    (state) => state?.authentication
  );
  // ---------------------------------------------------------------------------------------------------------
  // -------------------------------------------Functions-------------------------------------------------------
  const adminRoleChecker = () => {
    if (
      loggedInUserData.data.role === '0' ||
      loggedInUserData.data.role === '1'
    ) {
      if (
        allowedSubRoles.includes('3') ||
        allowedSubRoles.includes('4') ||
        allowedSubRoles.includes('5')
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  // ---------------------------------------------------------------------------------------------------------
  return isUserLoggedIn ? (
    adminRoleChecker() ? (
      <Outlet />
    ) : allowedSubRoles.includes(loggedInUserData?.data?.subRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/auth/login" />
  );
};
export { ProtectedRouteHandler };
