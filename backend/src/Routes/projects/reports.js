import express from "express";
import {
  getAllReports,
  newReport,
} from "../../Controllers/projects/reports.js";
import { parseMedia } from "../../Middlewares/parseMedia.js";
const router = express.Router();

router.route("/").get(getAllReports).post(parseMedia("report"), newReport);

export default router;
