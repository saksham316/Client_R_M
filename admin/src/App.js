// ----------------------------------------------Imports-----------------------------------------
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';
import VerifyLoginOTP from './pages/Authentication/OTPVerifications/VerifyLoginOTP';
import { useSelector } from 'react-redux';
import Login from './pages/Authentication/Login';
import './common/styles.css';
import ResetLoginPassword from './pages/Authentication/ResetLoginPassword';
import { ProtectedRouteHandler } from './layout/ProtectedRouteHandler';

// ---------------------------------------------------------------------------------------------

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const { isUserLoggedIn, isLoginOtpGenerated } = useSelector(
    (state) => state?.authentication
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Non Protected Routes  */}
          <Route
            path="/auth/login"
            element={isUserLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/auth/login/verifyOtp"
            element={isUserLoggedIn ? <Navigate to="/" /> : <VerifyLoginOTP />}
          />

          <Route
            path="/auth/resetPassword"
            element={
              isUserLoggedIn ? <Navigate to="/" /> : <ResetLoginPassword />
            }
          />
          <Route path="*" element={<PageNotFound />} />

          {/*  Protected Routes  */}
          <Route
            index
            element={
              isUserLoggedIn ? <Dashboard /> : <Navigate to="/auth/login" />
            }
          />
          {routes.map((routes, index) => {
            const {
              path,
              component: Component,
              allowedRoles,
              allowedSubRoles,
            } = routes;
            return (
              <Route
                element={
                  <ProtectedRouteHandler
                    allowedRoles={allowedRoles}
                    allowedSubRoles={allowedSubRoles}
                  />
                }
                key={index}
              >
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      {isUserLoggedIn ? (
                        <Component />
                      ) : (
                        <Navigate to="/auth/login" />
                      )}
                    </Suspense>
                  }
                />
              </Route>
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
