// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { verifyTokenMiddleware } from "../../../Middlewares/Auth/verifyTokenMiddleware.js";
import { getBucketData } from "../../../Controllers/Project/Task/taskController.js";

// -------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
export const adminTaskRouter = Router();
// -------------------------------------------------------------------------------------------------------------

// --------------------------------------------Department Routes----------------------------------------------

// getAllCoderTasks
adminTaskRouter.route("/bucket").get(verifyTokenMiddleware, getBucketData);
