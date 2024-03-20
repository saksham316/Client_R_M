import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------
const { Schema } = mongoose;

const otpSchema = new Schema({
  email: String,
  otp: String,
  expiryTime: String,
});
export const loginOtpModel = mongoose.model("loginOtp", otpSchema, "loginOtp");
