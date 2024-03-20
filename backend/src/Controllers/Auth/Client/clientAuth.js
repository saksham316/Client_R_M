import chalk from "chalk";
import { employeeModel } from "../../../Models/Authentication/employeeModel.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { saveAccessTokenToCookie } from "../../../../utils/AccessAndRefreshTokens/saveAccessTokenToCookie.js";
import { forgetPasswordMail } from "../../../../utils/MailTemplates/forgetPasswordMail.js";
import { loginOtpModel } from "../../../Models/Authentication/OTP/loginOtpModel.js";

// @desc - Login Admin
// @route - POST /admin/auth/adminLogin
// @access - The admin
export const clientLogin = async (req, res) => {
  try {
    // const jwt = jsonwebtoken;

    // Extracting email, password, and loginSession from the request
    const { email, password } = req?.body;

    // Checking if the user exists and is not disabled
    let userExistence = await employeeModel.findOne({ email });

    if (userExistence?.disabled) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized Access!! Please contact the admin",
      });
    }
    // if (!userExistence) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No Such user exists",
    //   });
    // }

    // Comparing the entered password with the hashed password in the database
    const passwordConfirmation = await bcrypt.compare(
      password,
      userExistence?.password
    );

    if (!passwordConfirmation) {
      return res.status(400).json({
        success: false,
        message: "Invalid email id and password",
      });
    }
    // OTP handling
    const otp = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    //send OTP from here

    await forgetPasswordMail(email, otp);

    //ENDS HERE
    // Generating a new OTP

    const payload = {
      email,
      otp,
    };
    await loginOtpModel.findOneAndUpdate(
      { email }, // Match criteria
      payload, // Updated payload
      {
        upsert: true, // Create a new document if not found
        new: true, // Return the modified document (new: true) or the original (new: false)
      }
    );

    //safeguarding the payload, as no password should go there
    delete userExistence?.password;
    //ends her

    // let encodedData = CryptoJS.AES.encrypt(
    //   JSON.stringify(userExistence),
    //   process.env.CRYPTO_SECRET_KEY
    // ).toString();

    // Fetching user's assigned categories and related course
    return res.status(200).json({
      success: true,
      message: "OTP Sent successfully",
    });
  } catch (error) {
    // Handling any errors that occur during the login process
    console.log(
      chalk.bgCyan("Inside catch block of login===>", error?.message || error)
    );
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};

// @desc -  verify client
// @route - POST /admin/auth/verifyAdminLoginOtp
// @access - Universal
export const verifyClientLoginOtp = async (req, res) => {
  try {
    //user check

    //ENDS HERE
    const { email, otp } = req?.body;
    const data = await loginOtpModel.find(
      { email, otp } // Match criteria
    );
    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Wrong OTP entered",
      });
    }

    let userData = await employeeModel.find({ email }).select("-password");

    const accessToken = jwt.sign(
      {
        id: userData._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
    );
    // Saving the access token to an httpOnly Cookie
    saveAccessTokenToCookie("CLIENT", res, accessToken);
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      data: userData[0]
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: error?.message ?? error,
    });
  }
};
