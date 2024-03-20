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

const CreatePermission = lazy(() =>
  import('../pages/Authentication/permissions/CreatePermission')
);
const ViewPermissions = lazy(() =>
  import('../pages/Authentication/permissions/ViewPermissions')
);
const UpdatePermission = lazy(() =>
  import('../pages/Authentication/permissions/UpdatePermission')
);

// ------------------------------------------------------------------------------
const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },

  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },

  // ------------------------------------------------------------------------------

  // New Routes

  // Employees Routes
  {
    path: '/employees/addEmployee',
    title: 'Add Employee',
    component: AddEmployee,
  },
  {
    path: '/employees/viewEmployees',
    title: 'View Employees',
    component: ViewEmployees,
  },
  {
    path: '/employees/updateEmployee/:employeeId',
    title: 'Update Employee',
    component: UpdateEmployee,
  },

  // Roles Routes
  {
    path: '/roles/createRole',
    title: 'Create Role',
    component: CreateRole,
  },
  {
    path: '/roles/viewRoles',
    title: 'View Roles',
    component: ViewRoles,
  },
  {
    path: '/roles/updateRole/:roleId',
    title: 'Update Role',
    component: UpdateRole,
  },

  // Permissions Routes
  {
    path: '/permissions/createPermission',
    title: 'Create Permission',
    component: CreatePermission,
  },
  {
    path: '/permissions/viewPermissions',
    title: 'View Permissions',
    component: ViewPermissions,
  },
  {
    path: '/permissions/updatePermission/:permissionId',
    title: 'Update Permission',
    component: UpdatePermission,
  },
];

const routes = [...coreRoutes];
export default routes;
