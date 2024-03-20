// function for generating dynamic url
// export const generateDynamicUrl = (value) => {
//   let baseUrl =
//     process.env.REACT_APP_WORKING_ENVIRONMENT === 'development'
//       ? process.env.REACT_APP_API_BASE_URL_DEVELOPMENT_SHOP_PANEL
//       : process.env.REACT_APP_API_BASE_URL_PRODUCTION_SHOP_PANEL;

//   const characters =
//     '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let randomString = '';
//   for (let i = 0; i < 3; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     randomString += characters.charAt(randomIndex);
//   }

//   let dynamicUrl = `${baseUrl}/${value}/${randomString}`;

//   return { randomString, dynamicUrl };
// };

// This method is used to check user having access or not.
export const isUserHavePermission = (role) => {
  let isAllowed = false;
  if (
    role?.toString()?.toUpperCase() === 'SUPER_ADMIN' ||
    role?.toString()?.toUpperCase() === 'ADMIN'
  )
    isAllowed = true;
  else isAllowed = false;
  return isAllowed;
};

export const availableRoles = ['SUPER_ADMIN', 'ADMIN', 'USER'];

export const availablePermissions = [
  'CREATE_VENUE',
  'VIEW_VENUES',
  'UPDATE_VENUE',
  'DELETE_VENUE',
  'CREATE_CATEGORY',
  'VIEW_CATEGORIES',
  'UPDATE_CATEGORY',
  'DELETE_CATEGORY',
  'CREATE_EVENT',
  'VIEW_EVENTS',
  'UPDATE_EVENT',
  'DELETE_EVENT',
  'CREATE_ORGANISER',
  'VIEW_ORGANISERS',
  'UPDATE_ORGANISER',
  'DELETE_ORGANISER',
  'CREATE_SHOP',
  'VIEW_SHOPS',
  'UPDATE_SHOP',
  'DELETE_SHOP',
  'CREATE_USER',
  'VIEW_USERS',
  'UPDATE_USER',
  'DELETE_USER',
  'CREATE_ROLE',
  'VIEW_ROLES',
  'UPDATE_ROLE',
  'DELETE_ROLE',
  'CREATE_PERMISSION',
  'VIEW_PERMISSIONS',
  'UPDATE_PERMISSION',
  'DELETE_PERMISSION',
];
