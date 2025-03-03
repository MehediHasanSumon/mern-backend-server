import { verifyToken } from "../../lib/AccessToken.js";
import User from "../models/Users.js";

export const isLoggedin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Please log in to your account." });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(403)
        .json({ message: "User not found. Please log in again." });
    }
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    req.user = userWithoutPassword;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(403)
        .json({ message: "Please log in to your account." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Unauthorized user." });
    }

    next();
  } catch (err) {
    console.error("Error in isAdmin middleware:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const verified = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(403)
        .json({ message: "Please log in to your account." });
    }

    if (!user.verify_at) {
      return res.status(403).json({ message: "Please verify your email." });
    }

    next();
  } catch (error) {
    console.error("Error in verified middleware:", error);
    res.status(500).send("Server error.");
  }
};
