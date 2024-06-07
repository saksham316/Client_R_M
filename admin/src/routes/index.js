import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));

// ------------------------------------------------------------------------------

const AddEmployee = lazy(() =>
  import('../pages/Authentication/employees/AddEmployee')
);
const ViewEmployees = lazy(() =>
  import('../pages/Authentication/employees/ViewEmployees')
);
const UpdateEmployee = lazy(() =>
  import('../pages/Authentication/employees/UpdateEmployee')
);

const CreateRole = lazy(() =>
  import('../pages/Authentication/roles/CreateRole')
);
const ViewRoles = lazy(() => import('../pages/Authentication/roles/ViewRoles'));
const UpdateRole = lazy(() =>
  import('../pages/Authentication/roles/UpdateRole')
);

// const CreatePermission = lazy(() =>
//   import('../pages/Authentication/permissions/CreatePermission')
// );
// const ViewPermissions = lazy(() =>
//   import('../pages/Authentication/permissions/ViewPermissions')
// );
// const UpdatePermission = lazy(() =>
//   import('../pages/Authentication/permissions/UpdatePermission')
// );

// Project
const ProjectDashboard = lazy(() =>
  import('../pages/Project/ProjectDashboard/ProjectDashboard')
);
const TasksManagement = lazy(() =>
  import('../pages/Project/TasksAssignment/TasksAssignment')
);
const KinserSheet = lazy(() =>
  import(`../pages/Project/KinserSheet/KinserSheet`)
);
const MyBucket = lazy(() => import(`../pages/Project/MyBucket/MyBucket`));

const Tasks = lazy(() => import(`../pages/Project/Tasks/Tasks`));

// ------------------------------------------------------------------------------
const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },

  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },

  // ------------------------------------------------------------------------------

  // New Routes

  // Employees Routes
  {
    path: '/employees/addEmployee',
    title: 'Add Employee',
    component: AddEmployee,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },
  {
    path: '/employees/viewEmployees',
    title: 'View Employees',
    component: ViewEmployees,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },
  {
    path: '/employees/updateEmployee/:employeeId',
    title: 'Update Employee',
    component: UpdateEmployee,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },

  // Roles Routes
  {
    path: '/roles/createRole',
    title: 'Create Role',
    component: CreateRole,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },
  {
    path: '/roles/viewRoles',
    title: 'View Roles',
    component: ViewRoles,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },
  {
    path: '/roles/updateRole/:roleId',
    title: 'Update Role',
    component: UpdateRole,
    allowedRoles: ['0', '1'],
    allowedSubRoles: [],
  },

  // Permissions Routes
  // {
  //   path: '/permissions/createPermission',
  //   title: 'Create Permission',
  //   component: CreatePermission,
  // allowedRoles:[],
  // allowedSubRoles:[]
  // },
  // {
  //   path: '/permissions/viewPermissions',
  //   title: 'View Permissions',
  //   component: ViewPermissions,
  // allowedRoles:[],
  // allowedSubRoles:[]
  // },
  // {
  //   path: '/permissions/updatePermission/:permissionId',
  //   title: 'Update Permission',
  //   component: UpdatePermission,
  // allowedRoles:[],
  // allowedSubRoles:[]
  // },

  // Project routes
  {
    path: '/project',
    title: 'Project Dashboard',
    component: ProjectDashboard,
    allowedRoles: ['0', '1', '2'],
    allowedSubRoles: ['0', '1', '2', '3', '4', '5', '2'],
  },
  {
    path: '/project/tasks-assignment',
    title: 'View Coder/NoteTaker Tasks',
    component: TasksManagement,
    allowedRoles: ['0', '1', '2'],
    allowedSubRoles: ['0', '1', '2'],
  },
  {
    path: '/project/kinser-sheet',
    title: 'Kinser sheet page',
    component: KinserSheet,
    allowedRoles: ['0', '1', '2'],
    allowedSubRoles: ['0', '1'],
  },
  {
    path: '/project/tasks',
    title: 'Tasks',
    component: Tasks,
    allowedRoles: ['0', '1', '2'],
    allowedSubRoles: ['3', '4', '5'],
  },
  {
    path: '/project/my-bucket',
    title: 'My Bucket',
    component: MyBucket,
    allowedRoles: ['0', '1', '2'],
    allowedSubRoles: ['0', '1'],
  },
];

const routes = [...coreRoutes];
export default routes;
