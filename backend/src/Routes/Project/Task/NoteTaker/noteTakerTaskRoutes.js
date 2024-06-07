// ----------------------------------------------Imports--------------------------------------------------------
import { Router } from "express";
import { verifyTokenMiddleware } from "../../../../Middlewares/Auth/verifyTokenMiddleware.js";
import {
  assignNoteTakerTasks,
  createNoteTakerTask,
  getAllNoteTakerTasks,
  updateNoteTakerTask,
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

// assignNoteTakerTasks
adminNoteTakerTaskRouter
  .route("/assign/:noteTakerId")
  .patch(verifyTokenMiddleware, assignNoteTakerTasks);

// updateNoteTakerTask
adminNoteTakerTaskRouter
  .route("/:noteTakerTaskId")
  .patch(verifyTokenMiddleware, updateNoteTakerTask);
