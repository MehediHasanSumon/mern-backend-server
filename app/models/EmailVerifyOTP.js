import mongoose from "mongoose";
const { Schema } = mongoose;

const EmailVerifyOTPSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120,
  },
});

const EmailVerifyOTP = mongoose.model("email_verify_otp", EmailVerifyOTPSchema);

export default EmailVerifyOTP;
