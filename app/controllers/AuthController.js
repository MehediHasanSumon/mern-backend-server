import { generateToken } from "../../lib/AccessToken.js";
import { hashPassword, matchPassword } from "../../lib/Password.js";
import { sendEmailVerifyOPT } from "../../lib/SendEmail.js";
import User from "../models/Users.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    if (!name.trim()) {
      return res.status(400).send({
        status: false,
        message: "Name is required.",
      });
    }

    if (name.length < 3) {
      return res.status(400).send({
        status: false,
        message: "Name must be at least 3 characters long.",
      });
    }

    if (!email.trim()) {
      return res.status(400).send({
        status: false,
        message: "Email is required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        status: false,
        message: "This email address is already registered.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!password.trim()) {
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
          "Password must include uppercase, lowercase, and a numeric character.",
      });
    }

    if (!confirm_password) {
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

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    await sendEmailVerifyOPT(user);
    return res.status(201).send({
      status: true,
      message: "User registration successful.",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "HTTP 500 Internal Server Error",
    });
  }
};
// User Login..
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password inputs
    if (!email?.trim()) {
      return res.status(400).send({
        status: false,
        message: "Email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!password?.trim()) {
      return res.status(400).send({
        status: false,
        message: "Password is required.",
      });
    }

    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(401).send({
        status: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        status: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(200).send({
      status: true,
      message: "User logged in successfully.",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send({
      status: false,
      message: "HTTP 500 Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).send({
      status: true,
      user,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: false,
      message: "HTTP 500 Internal Server Error",
    });
  }
};
