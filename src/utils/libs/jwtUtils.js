// utils/jwtUtils.js
import jwt from "jsonwebtoken";
import crypto from "crypto";

const secretKey = process.env.JWT_SECRET;
// const expiresIn = "1d";
// const resetTokenExpiresIn = "5m";

/**
 * @description Function to generate a JWT token
 * @param {Object} payload Payload to be signed
 * @param {String} expiresIn Expiry time for the token
 * @returns {String} Returns JWT token
 */

export const generateToken = (payload, expiresIn = expiresIn) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

/**
 * @description Function to verify a JWT token
 * @param {String} token JWT token to be verified
 * @returns {Object} Returns the decoded token
 */

export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    return null; // Token verification failed
  }
};

/**
 * @description Function to generate a reset token
 * @returns {String} Returns reset token
 */

export function generateResetToken() {
  return crypto.randomBytes(40).toString("hex");
}
