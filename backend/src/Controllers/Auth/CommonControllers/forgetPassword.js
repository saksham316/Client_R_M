import { employeeModel } from "../../../Models/Authentication/employeeModel.js";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendForgetPasswordMail } from "../../../../utils/MailTemplates/forgetMail.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose, { ObjectId } from "mongoose";
import { refIdModel } from "../../../Models/ForgetPassword/forgetPasswordRefIdModel.js";
import { configDotenv } from "dotenv";
const __dirname = dirname(fileURLToPath(import.meta.url));
//Not in use as of now
// @desc - Mail verificiation
// @route - POST /admin/auth/userVerification
// @access - The receiver of mail
//Not in use as of now

let userComingFrom = "";
export const forgetPassword = async (req, res) => {
  try {
    let { email } = req?.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Wrong mail id entered",
      });
    }
    let userData = await employeeModel.findOne({ email }).select("_id").lean();
    if (userData === null || userData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such user exists",
      });
    }
    // console.log("UseData", userData);
    const refId = new mongoose.Types.ObjectId();
    let encodedData = CryptoJS.AES.encrypt(
      JSON.stringify(userData?._id),
      process.env.CRYPTO_SECRET_KEY
    ).toString();

    const payload1 = {
      userId: userData?._id,
      refId,
    };

    //this is specific to generate a refId which verifies the forget password link
    await refIdModel.findOneAndUpdate(
      { userId: userData?._id }, // Match criteria
      payload1, // Updated payload
      {
        upsert: true, // Create a new document if not found
        new: true, // Return the modified document (new: true) or the original (new: false)
      }
    );
    //===========================ENDS HERE
    // console.log("Tjis is encoded data ", encodedData);
    const payload = jwt.sign(
      {
        id: encodedData,
        refId,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.FORGET_PASSWORD_LINK_VALIDITY }
    );
    const url = `${
      process.env.NODE_ENV === "development"
        ? process.env.PRODUCTION_URL
        : process.env.LOCAL_HOST_URL
    }/auth/forgetPassword/${payload}`;
    // send mail to the user
    await sendForgetPasswordMail(email, url);
    //ENds here
    return res.status(200).json({
      success: true,
      message: "A link has been sent to you on the mail id",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message ?? error,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    let userId = jwt.verify(id, process.env.JWT_SECRET_KEY);
    // Assuming 'ChangePassword' is your EJS file and 'views' is the directory
    // const environment =
    //   process.env.NODE_ENV === "development"
    //     ? process.env.LOCAL_HOST_URL
    //     : process.env.PRODUCTION_URL;

    const refId = userId.refId;
    let existingUserId = CryptoJS.AES.decrypt(
      userId?.id,
      process.env.CRYPTO_SECRET_KEY
    );

    existingUserId = CryptoJS.enc.Utf8.stringify(existingUserId) || "NA";
    // console.log("Inside", existingUserId);
    existingUserId = JSON.parse(existingUserId) || "NA";

    //check ref id with the data base
    const checkRefId = await refIdModel.find({ userId: existingUserId, refId });
    if (checkRefId.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Page expired",
      });
    }
    //=====================ENDS HERE
    res.render(
      path.join(
        __dirname,
        "../../../../views/ChangePassword/changePassword.ejs"
      ),
      { userId: id, refId: refId }
    );
  } catch (error) {
    console.log("Error in changePassword controller",error);
    return res.status(400).json({
      success: false,
      message: error?.message ?? error,
    });
  }
};

export const verifyChangePassword = async (req, res) => {
  try {
    let { userId, password } = req?.body;
    userId = jwt.verify(userId, process.env.JWT_SECRET_KEY);
    let id = CryptoJS.AES.decrypt(userId?.id, process.env.CRYPTO_SECRET_KEY);
    id = CryptoJS.enc.Utf8.stringify(id);
    id = JSON.parse(id);
    // console.log("Final user id", id);

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await employeeModel
      .findByIdAndUpdate(
        id,
        { $set: { password: hashedPassword } },
        { new: true }
      )
      .populate("role");
    // console.log("This is data", data);
    const refId = new mongoose.Types.ObjectId();
    const payload1 = {
      userId: id,
      refId,
    };
    //updateing the ref id to acknowledge that the password is changed succcessfully.
    await refIdModel.findOneAndUpdate(
      { userId: id }, // Match criteria
      payload1, // Updated payload
      {
        upsert: true, // Create a new document if not found
        new: true, // Return the modified document (new: true) or the original (new: false)
      }
    );
    // console.log("This is role", data?.role?.roleName);
    //=====================ENDS HERE
    // const role =
    return res.status(200).json({
      success: true,
      message: "Password changed successfully, Please login to continue",
      role: data?.role?.roleName,
    });
  } catch (error) {
    console.log("Error in verifyChange Password ", error);
    return res.status(400).json({
      success: false,
      message: error?.message ?? error,
    });
  }
};
