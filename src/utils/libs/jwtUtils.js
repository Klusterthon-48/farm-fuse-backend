// utils/jwtUtils.js
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET; 
const expiresIn = "1d";
const resetTokenExpiresIn = "5m"

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

export const generateResetToken = () => {
  console.log('Generating reset token...');
  try {
    const resetToken = jwt.sign({ type: 'reset' }, secretKey, { expiresIn: resetTokenExpiresIn });
    console.log('Reset token generated:', resetToken);
    return resetToken;
  } catch (error) {
    console.error('Error generating reset token:', error);
    throw error;
  }
};

