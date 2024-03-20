import express from "express";
import { verifyTokenMiddleware } from "../../Middlewares/Auth/verifyTokenMiddleware.js";
import { parseMedia } from "../../Middlewares/parseMedia.js";
import {
  newProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getParticularProjects,
} from "../../Controllers/projects/projectsDetails.js";

const router = express.Router();
router.route("/").get(getAllProjects).post(parseMedia("documents"), newProject);
router.route("/:id").delete(verifyTokenMiddleware, deleteProject);
router.route("/:id").get(getParticularProjects);
router
  .route("/:id")
  .patch(verifyTokenMiddleware, parseMedia("documents"), updateProject);

export default router;
