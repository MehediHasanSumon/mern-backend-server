import mongoose from "mongoose";
const { Schema } = mongoose;

const ResetPasswordTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180,
  },
});

const ResetPasswordToken = mongoose.model(
  "reset_password_token",
  ResetPasswordTokenSchema
);

export default ResetPasswordToken;
