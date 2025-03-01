import { hashPassword } from "../../lib/Password.js";
import { sendForgotPasswordLink } from "../../lib/SendEmail.js";
import ResetPasswordToken from "../Models/ResetPasswordToken.js";
import User from "../models/Users.js";

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email.trim()) {
      return res.status(400).send({
        status: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        status: false,
        message: "No account is associated with this email address.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Please enter a valid email address.",
      });
    }

    // Delete any existing OTPs for this email
    const token = await ResetPasswordToken.findOne({ email: user.email });
    if (token) {
      return res.status(400).send({
        status: false,
        message: "An email has already been sent. Please check your inbox.",
      });
    }

    await sendForgotPasswordLink(user);

    return res.status(200).send({
      status: true,
      message: `Email verification code has been sent to ${user.email}.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "HTTP 500 Internal Server Error",
    });
  }
};

export const confirmPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirm_password } = req.body;

    const getToken = await ResetPasswordToken.findOne({ token });
    if (!token || !token.trim() || !getToken) {
      return res.status(400).send({
        status: false,
        message: "Invalid or expired password reset token.",
      });
    }

    if (!password || !password.trim()) {
      return res.status(400).send({
        status: false,
        message: "Password is required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        status: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      return res.status(400).send({
        status: false,
        message:
          "Password must include at least one uppercase letter, one lowercase letter, and one numeric character.",
      });
    }

    if (!confirm_password || !confirm_password.trim()) {
      return res.status(400).send({
        status: false,
        message: "Confirm Password is required.",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).send({
        status: false,
        message: "Password and Confirm Password do not match.",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.findOne({ email: getToken.email });
    await User.updateOne({ _id: user._id }, { password: hashedPassword });

    await getToken.deleteOne();

    return res.status(200).send({
      status: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).send({
      status: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
