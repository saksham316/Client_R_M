import express from "express";
import {
  getAllTechnologies,
  newTechnology,
} from "../../Controllers/others/technologies.js";

const router = express.Router();
router.route("/").get(getAllTechnologies).post(newTechnology);
export default router;
