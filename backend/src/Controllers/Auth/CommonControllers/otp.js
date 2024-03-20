
import { loginOtpModel } from "../../../Models/Authentication/OTP/loginOtpModel.js";

export const verifyLoginOtp = async (req, res) => {
  try {
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

    let userData = await userModel.find({ email }).select("-password");
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: error?.message ?? error,
    });
  }
};
