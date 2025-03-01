import { sendEmailVerifyOPT } from "../../lib/SendEmail.js";
import EmailVerifyOTP from "../Models/EmailVerifyOTP.js";
import User from "../models/Users.js";

export const sendEmailVerifyOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found.",
      });
    }

    // Check if the email is already verified
    if (user.verify_at !== null) {
      return res.status(400).send({
        status: false,
        message: "Your email address is already confirmed.",
      });
    }

    // Delete any existing OTPs for this email
    const otp = await EmailVerifyOTP.findOne({ email: user.email });
    if (otp) {
      return res.status(400).send({
        status: false,
        message: "Your email verification code has already been sent.",
      });
    }

    // Send the verification OTP
    await sendEmailVerifyOPT(user);

    return res.status(200).send({
      status: true,
      message: `Email verification code has been sent to ${user.email}.`,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: false,
      message: "HTTP 500 Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;

    const email = req.user.email;

    if (!otp) {
      return res.status(400).send({
        status: false,
        error: "Please enter email verification code.",
      });
    }

    const getOtp = await EmailVerifyOTP.findOne({ email });
    if (!getOtp) {
      return res.status(404).send({
        status: false,
        message: "Invalid or expired email confirmation code.",
      });
    }
    if (getOtp.otp != otp) {
      return res.status(404).send({
        status: false,
        message: "Invalid or expired email confirmation code.",
      });
    }
    const user = await User.findOne({ email });
    user.verify_at = Date.now();
    await user.save();
    await EmailVerifyOTP.deleteOne({ email });

    return res.status(200).send({
      status: true,
      message: "Email verification has been confirmed successfully.",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: false,
      message: "HTTP 500 Internal Server Error",
    });
  }
};
