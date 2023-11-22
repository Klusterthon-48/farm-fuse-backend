// utils/jwtUtils.js
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET; 
const expiresIn = "1d";

export const signToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Token verification failed
  }
};
