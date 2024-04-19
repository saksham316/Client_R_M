import { useSelector } from 'react-redux';
// ------------------------------------------------------

const useAuth = () => {
  const authData = useSelector((state) => state?.authentication);
  const userData = useSelector((state) => state?.user);
  const role = authData?.loggedInUserData?.data?.role || '';
  const subRole = authData?.loggedInUserData?.data?.subRole || '';
  return {
    isUserLoggedIn: authData?.isUserLoggedIn || false,
    loggedInUserData: authData?.loggedInUserData || {},
    usersList: userData?.usersList || [],
    role,
    subRole,
  };
};

export default useAuth;
