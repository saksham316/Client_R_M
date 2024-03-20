import chalk from "chalk";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import tempUserModel from "../../../Models/Authentication/tempUserModel.js";
import CryptoJS from "crypto-js";
import { employeeModel } from "../../../Models/Authentication/employeeModel.js";
import mongoose from "mongoose";
import { urlProvider } from "../../../configs/GoogleConsoleConfigs/generateUrl.js";
import { saveAccessTokenToCookie } from "../../../../utils/AccessAndRefreshTokens/saveAccessTokenToCookie.js";
import { sendMail } from "../../../../utils/MailTemplates/SignUpMail/signUpMail.js";
import { forgetPasswordMail } from "../../../../utils/MailTemplates/forgetPasswordMail.js";
import { loginOtpModel } from "../../../Models/Authentication/OTP/loginOtpModel.js";

// @desc - creating the USER
// @route - POST /admin/auth/signUp
// @access - Admin specfic
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, username } = JSON.parse(
      req?.body?.payload
    );
    const existedUser = await employeeModel.find({ email });
    if (existedUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email id already exists",
      });
    }
    let avatar;
    //Works if there exists a file in request
    if (req?.file) {
      const avatarName = `${Math.ceil(Math.random() * 1000000000)}${
        req?.file?.originalname
      }`;
      avatar = await urlProvider(req?.file?.buffer, avatarName);
    }
    const payload = {
      fullName,
      email,
      password,
      username,
      avatar: avatar?.publicUrl ?? "NA",
    };
    const hashedPassword = await bcrypt.hash(payload?.password, 10);
    payload.password = hashedPassword;
    const data = await employeeModel.findOneAndUpdate(
      { email: email }, // Match criteria
      payload, // Updated payload
      {
        upsert: true, // Create a new document if not found
        new: true, // Return the modified document (new: true) or the original (new: false)
      }
    );
    let encodedMessage = jwt.sign(
      { _id: data?._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" }
    );
    class Details {
      constructor(payload, message) {
        this.message = message;
        this.email = payload?.email;
        this.password = password;
      }
    }
    await sendMail(
      email,
      new Details(payload, "These are your credentials for CRM")
    );
    await sendMail(
      process.env.ADMIN_MAIL,
      new Details(payload, "Added a new user with these credentials")
    );
    // await sendMail(email, details);
    // Ends Here
    return res.status(201).json({
      success: true,
      message: "Created User successfully",
    });
  } catch (error) {
    console.log(chalk.bgRedBright(`This is error ${error}`));

    return res.status(400).json({
      success: false,
      message: error?.message ?? error,
    });
  }
};

//Not in use as of now
// @desc - Mail verificiation
// @route - POST /admin/auth/userVerification
// @access - The receiver of mail
//Not in use as of now
export const userVerificationLink = async (req, res) => {
  try {
    // console.log("Inside", req?.params);
    let { id } = req?.params;
    // console.log("Inside1", id);

    let { _id } = jwt.verify(id, process.env.JWT_SECRET_KEY);

    const payload = await tempUserModel.findOne({ _id: _id });
    if (!payload) {
      return res.status(200).json({
        success: false,
        message: "The page has been expired, please try again latter",
      });
    }

    //Deleteing the user from temp model
    await tempUserModel.findByIdAndDelete({
      _id: _id,
    });
    //     const payload = "";
    // console.log("This is payload", payload);
    await employeeModel.findOneAndUpdate(
      { email: payload.email }, // Match criteria
      payload, // Updated payload
      {
        upsert: true, // Create a new document if not found
        new: true, // Return the modified document (new: true) or the original (new: false)
      }
    );
    return res.status(200).json({
      success: true,
      message: "Signed up successfully, please continue with login",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message ?? error,
    });
  }
};

// @desc - Login Admin
// @route - POST /admin/auth/adminLogin
// @access - The admin
export const adminLogin = async (req, res) => {
  try {
    // const jwt = jsonwebtoken;

    // Extracting email, password, and loginSession from the request
    const { email, password } = req?.body;

    // Checking if the user exists and is not disabled
    let userExistence = await employeeModel.findOne({ email });
    if (!userExistence) {
      return res.status(400).json({
        success: false,
        message: "No Such user exists",
      });
    }
    if (userExistence?.disabled) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized Access!! Please contact the admin",
      });
    }
    if (userExistence?.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid email id and password`,
      });
    }

    // Comparing the entered password with the hashed password in the database
    // console.log("Password", password);
    // console.log("Password", userExistence);
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
    //Adding the otp ref to the database

    //ENDS HERE

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
      message: "OTP sent Successfully",
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

// @desc - Logout Admin
// @route - POST /admin/auth/logout
// @access - Universal
export const logout = async (req, res) => {
  try {
    // Extracting cookies and loginSession from the request
    const cookies = req?.cookies;

    // Clearing cookies related to access token and login status
    res.clearCookie("ACCESS_TOKEN_CRM_ADMIN");
    // res.clearCookie("LOGIN_STATUS");

    // Returning a success response
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    // Handling any errors that occur during the logout process
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc -  verify admin
// @route - POST /admin/auth/verifyAdminLoginOtp
// @access - Universal
export const verifyAdminLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req?.body;
    const data = await loginOtpModel.find(
      { email, otp } // Match criteria
    );
    if (data.length === 0) {
      return res.status(400).json({
        success: true,
        message: "Wrong OTP entered",
      });
    }
    let userData = await employeeModel.find({ email }).select("-password");

    const accessToken = jwt.sign(
      {
        id: userData?.[0]?._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_VALIDITY }
    );

    //delete otp
    await loginOtpModel.findOneAndDelete({ email, otp });
    //ends here

    // Saving the access token to an httpOnly Cookie

    saveAccessTokenToCookie("ADMIN", res, accessToken);
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      data: userData[0],
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: error?.message ?? error,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // Extracting email from the request body
    const { email } = req.body;

    // Checking if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email ID is required to generate Refresh Token",
      });
    }

    // Checking if the user with the given email exists
    const user = await employeeModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email Does Not Exist",
      });
    }

    // Clearing the existing access token cookie
    res.clearCookie("ACCESS_TOKEN_CRM_ADMIN");

    // Generating a new refresh token with extended expiration time (15 days)
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
    );

    // Saving the new refresh token to an httpOnly Cookie
    saveAccessTokenToCookie("ADMIN", res, refreshToken);

    // Returning a success response
    return res.status(200).json({
      success: true,
      message: "Refresh Token Generated",
    });
  } catch (error) {
    // Handling any errors that occur during the process
    console.log("Error message:", error.message);
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
