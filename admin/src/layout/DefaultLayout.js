import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { HeaderNonAuthenticatedScreen } from '../components/HeaderNonAuthenticatedScreen';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------
const DefaultLayout = () => {
  const { isUserLoggedIn } = useSelector((state) => state?.authentication);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {isUserLoggedIn ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="non-authenticated-container">
          <HeaderNonAuthenticatedScreen />
          <Outlet />
        </div>
      )} 
    </div>
  );
};

export default DefaultLayout;
