import express from "express";
import {
  checkAuth,
  login,
  register,
} from "../app/controllers/AuthController.js";
import {
  confirmPassword,
  forgetPassword,
} from "../app/controllers/PasswordController.js";
import { isAdmin, isLoggedin } from "../app/middlewares/AuthMiddleware.js";
import {
  sendEmailVerifyOTP,
  verifyEmail,
} from "../app/controllers/EmailVerificationController.js";
import { deleteUser, getAllUser } from "../app/controllers/UserController.js";

const route = express.Router();

// // Auth Routes
route.post("/register", register);
route.post("/login", login);
route.get("/resend-verify-email", isLoggedin, sendEmailVerifyOTP);
route.post("/verify-email", isLoggedin, verifyEmail);
route.post("/forget-password", forgetPassword);
route.post("/confirm-password/:token", confirmPassword);
route.get("/checkauthuser", isLoggedin, checkAuth);

// Admin Routes
route.get("/users", isLoggedin, isAdmin, getAllUser);
route.delete("/user/:id", isLoggedin, isAdmin, deleteUser);

export default route;
