import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Load the secret key from environment variables
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Generate a JSON Web Token (JWT) for a user
 * @param {Object} user - The user object containing user details
 * @param {string} user._id - The unique identifier of the user
 * @returns {string} - The generated JWT token
 * @throws {Error} - Throws an error if token generation fails
 */
export function generateToken(user) {
  try {
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "15d" });
    return token;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}

/**
 * Verify the validity of a JSON Web Token (JWT)
 * @param {string} token - The JWT token to verify
 * @returns {Object} - The decoded token payload if valid
 * @throws {Error} - Throws an error if the token is invalid or expired
 */
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
