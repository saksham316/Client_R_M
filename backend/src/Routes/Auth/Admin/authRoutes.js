//------------------------------------------------imports----------------------------------------------
import express from "express";
import { parseMedia } from "../../../Middlewares/parseMedia.js";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getIndividualPermission,
  updatePermission,
} from "../../../Controllers/Auth/Admin/permissionController.js";
import {
  adminLogin,
  logout,
  signUp,
  userVerificationLink,
  verifyAdminLoginOtp,
} from "../../../Controllers/Auth/Admin/adminAuth.js";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getIndividualRole,
  updateRole,
} from "../../../Controllers/Auth/Admin/roleController.js";
import { verifyTokenMiddleware } from "../../../Middlewares/Auth/verifyTokenMiddleware.js";

// -----------------------------------------------------------------------------------------------------

const adminAuthRouter = express.Router();

// -----------------------------------------Authentication Routes---------------------------------------
// -----------------------------------------------------------------------------------------------------

// signUp
adminAuthRouter.route("/signUp").post(parseMedia("avatar"), signUp);
// signUp userVerification
adminAuthRouter.route("/signUp/:id").get(userVerificationLink);

// login admin
adminAuthRouter.route("/login").post(adminLogin);

//

adminAuthRouter.route("/verifyAdminLoginOtp").post(verifyAdminLoginOtp);

// logout
adminAuthRouter.route("/logout").post(verifyTokenMiddleware, logout);
// --------------------------------------------Role Routes-----------------------------------------------
// createRole
adminAuthRouter.route("/role").post(verifyTokenMiddleware, createRole);

// updateRole
adminAuthRouter.route("/role/:roleId").patch(verifyTokenMiddleware, updateRole);

// deleteRole
adminAuthRouter
  .route("/role/:roleId")
  .delete(verifyTokenMiddleware, deleteRole);

// getAllRoles
adminAuthRouter.route("/role").get(verifyTokenMiddleware, getAllRoles);

// getIndividualRoles
adminAuthRouter
  .route("/role/:roleId")
  .get(verifyTokenMiddleware, getIndividualRole);
// ------------------------------------------------------------------------------------------------------

// -----------------------------------------Permission Routes---------------------------------------------
// createPermission
adminAuthRouter
  .route("/permission")
  .post(verifyTokenMiddleware, createPermission);

// updatePermission
adminAuthRouter
  .route("/permission/:permissionId")
  .patch(verifyTokenMiddleware, updatePermission);

// deletePermission
adminAuthRouter
  .route("/permission/:permissionId")
  .delete(verifyTokenMiddleware, deletePermission);

// getAllPermissions
adminAuthRouter
  .route("/permission")
  .get(verifyTokenMiddleware, getAllPermissions);

// getIndividualPermission
adminAuthRouter
  .route("/permission/:permissionId")
  .get(verifyTokenMiddleware, getIndividualPermission);
// ------------------------------------------------------------------------------------------------------

export { adminAuthRouter };
