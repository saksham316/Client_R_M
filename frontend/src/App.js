import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import { Toaster } from 'react-hot-toast';
import SignUp from './pages/Authentication/SignUp';
import { Login } from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';
import OtpPage from './pages/Authentication/OtpPage';
import ResetLoginPassword from './pages/Authentication/ResetLoginPassword';
import ChangePassword from './pages/Authentication/ChangePassword';
import useAuth from './hooks/useAuth';
import { HeroBanner } from './components/HeroBanner';
// ----------------------------------------------------------------------

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const { isUserLoggedIn } = useAuth();

  // const isUserLoggedIn = false;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
          <Route
            index
            element={isUserLoggedIn ? <Dashboard /> : <HeroBanner />}
          />
          <Route
            path="/login"
            element={isUserLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/otp"
            element={isUserLoggedIn ? <Navigate to="/" /> : <OtpPage />}
          />
          <Route
            path="/forgot-password"
            element={
              isUserLoggedIn ? <Navigate to="/" /> : <ResetLoginPassword />
            }
          />
          <Route
            path="/change-password"
            element={isUserLoggedIn ? <Navigate to="/" /> : <ChangePassword />}
          />

          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    {isUserLoggedIn ? <Component /> : <Navigate to="/login" />}
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
