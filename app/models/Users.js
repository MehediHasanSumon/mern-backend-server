import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify_at: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "learner", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);
export default User;
