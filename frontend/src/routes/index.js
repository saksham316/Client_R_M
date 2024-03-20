import { lazy } from 'react';
const Profile = lazy(() => import('../pages/Profile'));
const ProfileForm = lazy(() => import('../pages/ProfileForm'));
const Settings = lazy(() => import('../pages/Settings'));
const Attendance = lazy(() => import('../pages/Attendance/Attendance'));
const Mail = lazy(() => import('../pages/Mail/Mail'));
const Projects = lazy(() => import('../pages/Projects/MyProjects'));
const NoticeBoard = lazy(() => import('../pages/NoticeBoard/NoticeBoard'));
const IT_Ticket = lazy(() => import('../pages/IT_Ticket/IT_Ticket'));
const SearchEmployee = lazy(() =>
  import('../pages/SearchEmployee/SearchEmployee')
);
const Chat = lazy(() => import('../pages/Chat/Chat'));



// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: ProfileForm,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },

  {
    path: '/mail',
    title: 'Mail',
    component: Mail,
  },

  {
    path: '/projects',
    title: 'Project',
    component: Projects,
  },

  {
    path: '/attendance',
    title: 'Attendance',
    component: Attendance,
  },
  {
    path: '/noticeBoard',
    title: 'NoticeBoard ',
    component: NoticeBoard,
  },
  {
    path: '/IT_Ticket',
    title: 'IT_Ticket',
    component: IT_Ticket,
  },
  {
    path: '/searchEmployee',
    title: 'SearchEmployee',
    component: SearchEmployee,
  },
  {
    path: '/chat',
    title: 'Chat',
    component: Chat,
  },
  
];

const routes = [...coreRoutes];
export default routes;
