// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { parseMedia } from "../../Middlewares/parseMedia.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getIndividualEmployee,
  updateEmployee,
} from "../../Controllers/Employee/employeeController.js";
import { verifyTokenMiddleware } from "../../Middlewares/Auth/verifyTokenMiddleware.js";
// -------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
export const adminEmployeeRouter = Router();
// -------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------Mail Routes-----------------------------------------------

// createUser
adminEmployeeRouter
  .route("/")
  .post(verifyTokenMiddleware, parseMedia("avatar"), createEmployee);

// updateEmployee
adminEmployeeRouter
  .route("/:employeeId")
  .patch(verifyTokenMiddleware, parseMedia("avatar"), updateEmployee);

// deleteEmployee
adminEmployeeRouter
  .route("/:employeeId")
  .delete(verifyTokenMiddleware, deleteEmployee);

// getAllEmployees
adminEmployeeRouter.route("/").get(verifyTokenMiddleware, getAllEmployees);

// getIndividualEmployee
adminEmployeeRouter
  .route("/:employeeId")
  .get(verifyTokenMiddleware, getIndividualEmployee);