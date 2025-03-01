import dotenv from "dotenv";
import { generateRandomNumber, generateRandomString } from "./Helper.js";
import EmailVerifyOTP from "../app/Models/EmailVerifyOTP.js";
import SentForgotPasswordLinkTemplate from "./EmailTemplates/ResetPasswordTokenTemplate.js";
import ResetPasswordToken from "../app/Models/ResetPasswordToken.js";
import EmailVerifyOtpTemplate from "./EmailTemplates/EmailVerifyTemplate.js";
import emailSend from "../config/Email.js";
dotenv.config();

export const sendEmailVerifyOPT = async (user) => {
  const otp = generateRandomNumber();
  const token = await EmailVerifyOTP.create({ email: user.email, otp });
  const otpVerificationLink = `${process.env.FRONTEND_HOST}/account/email-verify`;
  const subject = "OTP - Verify your account.";
  const template = EmailVerifyOtpTemplate(user, token.otp, otpVerificationLink);
  const info = emailSend(user, subject, template);
  return info;
};
export const sendForgotPasswordLink = async (user) => {
  const token = generateRandomString(60);
  await ResetPasswordToken.create({ email: user.email, token });
  const resetPasswordLink = `${process.env.FRONTEND_HOST}/confirm-password/${token}`;
  const subject = "Reset Your Password and Regain Access to Your Account.";
  const app_name = process.env.APP_NAME;
  const template = SentForgotPasswordLinkTemplate(
    user,
    resetPasswordLink,
    app_name
  );
  const info = emailSend(user, subject, template);
  return info;
};
