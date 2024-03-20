//------------------------------------------------imports----------------------------------------------
import express from "express";
import { clientLogin, verifyClientLoginOtp } from "../../../Controllers/Auth/Client/clientAuth.js";

// -----------------------------------------------------------------------------------------------------

const clientAuthRouter = express.Router();

// -----------------------------------------Authentication Routes---------------------------------------
// -----------------------------------------------------------------------------------------------------

// signUp
clientAuthRouter.route("/login").post(clientLogin);


//verify OTP 
clientAuthRouter.route("/verifyClientLoginOtp").post(verifyClientLoginOtp);
export { clientAuthRouter };
