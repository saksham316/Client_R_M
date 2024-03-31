import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect } from "./config/database.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 7003;
dotenv.config();

// -------------------------------------------CORS HANDLING---------------------------------------------------
app.use(
  cors(
    process.env.NODE_ENV === "development"
      ? {
          origin: developmentWhiteListedIpAddresses,
          credentials: true,
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          exposedHeaders: ["*", "Authorization"],
        }
      : {
          origin: productionWhiteListedIpAddresses,
          credentials: true,
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          exposedHeaders: ["*", "Authorization"],
        }
  )
);
//  --------------------------------------------- Ends here-----------------------------------------------
app.use(cookieParser());
// express.json - It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Ends here

// Mongo db conection
mongoConnect();
// ------------------------------------------------ENDS HERE---------------------------------------------

// -------------------------------------------Routes Section Start-----------------------------------------

// Router Imports
import projectsRoutes from "./src/Routes/projects/projectsDetails.js";
import tasksRoutes from "./src/Routes/projects/tasks.js";
import reportRoutes from "./src/Routes/projects/reports.js";
import technologyRoutes from "./src/Routes/others/technology.js";
import { adminAuthRouter } from "./src/Routes/Auth/Admin/authRoutes.js";
import { authRouter } from "./src/Routes/Auth/CommonRoutes.js/forgetPassword.js";
import { clientAuthRouter } from "./src/Routes/Auth/Client/clientRoutes.js";
import { adminEmployeeRouter } from "./src/Routes/Employee/employeeRoutes.js";
import {
  developmentWhiteListedIpAddresses,
  productionWhiteListedIpAddresses,
} from "./utils/index.js";
import { adminDepartmentRouter } from "./src/Routes/Department/departmentRoutes.js";
import { adminCoderTaskRouter } from "./src/Routes/Project/Task/Coder/coderTaskRoutes.js";
import { adminTaskRouter } from "./src/Routes/Project/Task/taskRoutes.js";

// versionOne -- used to append api/v1 to all the routes
function versionOne(parameters) {
  return `/api/v1/${parameters}`;
}

//Admin Routes
app.use(versionOne("admin/auth"), adminAuthRouter);
app.use(versionOne("admin/employee"), adminEmployeeRouter);
app.use(versionOne("admin/department"), adminDepartmentRouter);
app.use(versionOne("admin/task"), adminTaskRouter);
app.use(versionOne("admin/task/coder"), adminCoderTaskRouter);

// Client Routes
app.use(versionOne("client/auth"), clientAuthRouter);

// Common Routes
app.use(versionOne("auth"), authRouter);
app.use(versionOne("tasks"), tasksRoutes);
app.use(versionOne("technology"), technologyRoutes);
app.use(versionOne("reports"), reportRoutes);
app.use(versionOne("projects"), projectsRoutes);

app.get("/api/v1", async (req, res) => {
  try {
    console.log("Inside");
    return res.status(200).json({
      success: true,
      message: "Backend is working",
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error ?? error?.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    chalk.bold.bgMagentaBright(`Server Started and Running at PORT ${PORT}`)
  );
});

// -----------------------------------------------------------------------------------------------------------
