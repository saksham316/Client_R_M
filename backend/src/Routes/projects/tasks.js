import express from "express";
import {
  getAllTasks,
  getParticularTasks,
  newTask,
} from "../../Controllers/projects/tasks.js";

const router = express.Router();
router.route("/").get(getAllTasks).post(newTask);
router.route("/:id").get(getParticularTasks);

export default router;
