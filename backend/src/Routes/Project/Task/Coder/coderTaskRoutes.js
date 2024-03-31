// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { verifyTokenMiddleware } from "../../../../Middlewares/Auth/verifyTokenMiddleware.js";
import {
  assignCoderTasks,
  createCoderTask,
  getAllCoderTasks,
  getIndividualCoderTask,
  updateCoderTask,
} from "../../../../Controllers/Project/Task/Coder/coderTaskController.js";
// -------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
export const adminCoderTaskRouter = Router();
// -------------------------------------------------------------------------------------------------------------

// --------------------------------------------Department Routes----------------------------------------------

// createCoderTask
adminCoderTaskRouter.route("/").post(verifyTokenMiddleware, createCoderTask);

// updateCoderTask
adminCoderTaskRouter
  .route("/:coderTaskId")
  .patch(verifyTokenMiddleware, updateCoderTask);

// getAllCoderTasks
adminCoderTaskRouter.route("/").get(verifyTokenMiddleware, getAllCoderTasks);

// getIndividualCoderTask
adminCoderTaskRouter
  .route("/:coderTaskId")
  .get(verifyTokenMiddleware, getIndividualCoderTask);

// assignCoderTasks
adminCoderTaskRouter
  .route("/assign/:coderId")
  .patch(verifyTokenMiddleware, assignCoderTasks);

// // deleteDepartment
// adminCoderTaskRouter.route("/").delete(verifyTokenMiddleware, deleteDepartment);

// // updateDepartment
// adminCoderTaskRouter.route("/").post(verifyTokenMiddleware, updateDepartment);
