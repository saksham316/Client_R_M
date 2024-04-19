// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { verifyTokenMiddleware } from "../../../../Middlewares/Auth/verifyTokenMiddleware.js";
import {
  assignNoteTakerTasks,
  createNoteTakerTask,
  getAllNoteTakerTasks,
} from "../../../../Controllers/Project/Task/NoteTaker/noteTakerTaskController.js";
// -------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
export const adminNoteTakerTaskRouter = Router();
// -------------------------------------------------------------------------------------------------------------

// --------------------------------------------Department Routes----------------------------------------------

// getAllNoteTakerTasks
adminNoteTakerTaskRouter
  .route("/")
  .get(verifyTokenMiddleware, getAllNoteTakerTasks);

// createNoteTakerTask
adminNoteTakerTaskRouter
  .route("/")
  .post(verifyTokenMiddleware, createNoteTakerTask);

// assignCoderTasks
adminNoteTakerTaskRouter
  .route("/assign/:noteTakerId")
  .patch(verifyTokenMiddleware, assignNoteTakerTasks);
