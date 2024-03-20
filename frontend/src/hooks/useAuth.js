import { useSelector } from "react-redux";
// ------------------------------------------------------

const useAuth = () => {
  const authData = useSelector((state) => state?.auth);
  const userData = useSelector((state) => state?.user);

  return {
    isUserLoggedIn: authData?.isUserLoggedIn || false,
    loggedInUserData: authData?.loggedInUserData || {},
    usersList: userData?.usersList || [],
  };
};

export default useAuth;
