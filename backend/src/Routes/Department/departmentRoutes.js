// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { verifyTokenMiddleware } from "../../Middlewares/Auth/verifyTokenMiddleware.js";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getIndividualDepartment,
  updateDepartment,
} from "../../Controllers/Department/departmentController.js";
// -------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
export const adminDepartmentRouter = Router();
// -------------------------------------------------------------------------------------------------------------

// --------------------------------------------Department Routes----------------------------------------------

// createDepartment
adminDepartmentRouter.route("/").post(verifyTokenMiddleware, createDepartment);

// getAllDepartments
adminDepartmentRouter.route("/").get(verifyTokenMiddleware, getAllDepartments);

// getIndividualDepartment
adminDepartmentRouter
  .route("/")
  .get(verifyTokenMiddleware, getIndividualDepartment);

// deleteDepartment
adminDepartmentRouter
  .route("/")
  .delete(verifyTokenMiddleware, deleteDepartment);

// updateDepartment
adminDepartmentRouter.route("/").post(verifyTokenMiddleware, updateDepartment);
