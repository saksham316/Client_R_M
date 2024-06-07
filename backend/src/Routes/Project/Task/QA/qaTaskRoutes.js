// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { verifyTokenMiddleware } from "../../../../Middlewares/Auth/verifyTokenMiddleware.js";
import {
  getAllQATasks,
  updateQATask,
} from "../../../../Controllers/Project/Task/QA/qaTaskController.js";
// -------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
export const adminQATaskRouter = Router();
// -------------------------------------------------------------------------------------------------------------

// --------------------------------------------Department Routes----------------------------------------------

// getAllQATasks
adminQATaskRouter.route("/").get(verifyTokenMiddleware, getAllQATasks);

// updateQATask
adminQATaskRouter
  .route("/:qaTaskId")
  .patch(verifyTokenMiddleware, updateQATask);
