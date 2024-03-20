//------------------------------------------------imports----------------------------------------------
import express from "express";
import {
  changePassword,
  forgetPassword,
  verifyChangePassword,
} from "../../../Controllers/Auth/CommonControllers/forgetPassword.js";
import { verifyLoginOtp } from "../../../Controllers/Auth/CommonControllers/otp.js";

// -----------------------------------------------------------------------------------------------------

const authRouter = express.Router();

// -----------------------------------------Authentication Routes---------------------------------------
// -----------------------------------------------------------------------------------------------------
// change Password mail
authRouter.route("/forgetPassword").post(forgetPassword);

//Change password
authRouter.route("/forgetPassword/:id").get(changePassword);

//Change password
authRouter.route("/verifyChangePassword").post(verifyChangePassword);


//Change password
authRouter.route("/verifyChangePassword").post(verifyChangePassword);


// ------------------------------------------------------------------------------------------------------

//Change password
// authRouter.route("/verifyLoginOtp").post(verifyLoginOtp);
// ------------------------------------------------------------------------------------------------------

export { authRouter };
