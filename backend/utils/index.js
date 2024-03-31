export const developmentWhiteListedIpAddresses = [
  "http://localhost:7001",
  "http://localhost:7002",
];

export const productionWhiteListedIpAddresses = [
  "https://crm-mern-app.vercel.app",
  "https://crm-mern-app-admin.vercel.app",
];

export const ACCESS_TOKEN = "ACCESS_TOKEN_CRM_DEVELOPMENT";

// availableRoles -- these are the available roles in the project
export const availableRoles = ["SUPER_ADMIN", "ADMIN", "EMPLOYEE"];

// availableSubRoles -- these are the available sub roles in the project
export const availableSubRoles = [
  "CODER_MANAGER",
  "NOTE_TAKER_MANAGER",
  "QA_MANAGER",
  "CODER",
  "NOTE_TAKER",
  "QA",
];

// roleChecker -- to check the role of the user
export const roleChecker = (role) => {
  return availableRoles[role];
};

// subRoleChecker -- to check the subRole of the user
export const subRoleChecker = (subRole) => {
  return availableSubRoles[subRole];
};
