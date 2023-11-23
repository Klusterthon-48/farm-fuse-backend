import { StatusCodes } from "http-status-codes";
import farmerSchema from "../models/farmer_account.model.js";
import { errorResponse, successResponse } from "../utils/libs/response.libs.js";
import tryCatchLibs from "../utils/libs/tryCatch.libs.js";
import farmerModel from "../models/farmer_account.model.js";
import {hashPassword, comparePasswords} from "../utils/libs/bcryptUtils.js"
import { generateResetToken, signToken, verifyToken } from "../utils/libs/jwtUtils.js";
import { sendPasswordResetEmail } from "../utils/libs/emailUtils.js";


// Sample Function to create a new farmer
export const createNewFarmer = tryCatchLibs(async (req, res) => {
  const { name, username, email, password } = req.body;

  // Check if the username already exists
  const existingFarmer = await farmerModel.findOne({ username });
  if (existingFarmer) {
    return errorResponse(res, "Username already exists", StatusCodes.CONFLICT);
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new farmer with the hashed password
  const newFarmer = await farmerModel.create({ name, username, email, password: hashedPassword });

  return successResponse(res, "Farmer created", newFarmer, StatusCodes.CREATED);
});



export const authenticateFarmer = tryCatchLibs(async (req, res) => {
  const { username, password } = req.body;

  // Find the farmer by username
  const farmer = await farmerModel.findOne({ username });
  if (!farmer) {
    return errorResponse(res, "Username does not exist", StatusCodes.NOT_FOUND);
  }

  // Check if the provided password matches the stored hashed password
  const passwordMatch = await comparePasswords(password, farmer.password);

  if (!passwordMatch) {
    return errorResponse(res, "Invalid password", StatusCodes.UNAUTHORIZED);
  }

  // If the username and password are valid, create and sign a JWT token
  const token = signToken({ username: farmer.username });

  // Send success response with the token and farmer details
  return successResponse(res, "Authentication successful", { farmer, token }, StatusCodes.OK);
});


export const accessDashboard = tryCatchLibs(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return errorResponse(res, "Token not provided", StatusCodes.UNAUTHORIZED);
  }

  // Verify the JWT token
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return errorResponse(res, "Invalid token", StatusCodes.UNAUTHORIZED);
  }

  // The token is valid, you can access the dashboard or perform other actions here
  // For example, you might fetch additional data from the database based on the decodedToken

  // Simulate fetching data from the database based on the decodedToken
  const dataFromDatabase = {
    // Some data relevant to the dashboard
    farmerUsername: decodedToken.username,
  };

  return successResponse(res, "Access granted", dataFromDatabase, StatusCodes.OK);
});



export const forgotPassword = tryCatchLibs(async (req, res) => {
  const { email } = req.body;

  const farmer = await farmerModel.findOne({ email });

  if (!farmer) {
    return errorResponse(res, 'No account found with that email address', StatusCodes.NOT_FOUND);
  }

  // Generate a unique token for password reset (you need to implement this function)
  const resetToken = generateResetToken();

  // Save the reset token and its expiration time to the farmer document
  farmer.resetPasswordToken = resetToken;
  farmer.resetPasswordExpires = Date.now() + 3600000;

  await farmer.save();

  // Send a password reset email to the farmer
  try {
    await sendPasswordResetEmail(farmer.email, farmer.name, resetToken);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return errorResponse(res, 'Error sending password reset email', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return successResponse(res, 'Password reset email sent successfully', null, StatusCodes.OK);
});




// ... (your existing imports)

export const resetPassword = tryCatchLibs(async (req, res) => {
  const { resetToken, newPassword } = req.body;

  // Find the farmer by the reset token
  const farmer = await farmerModel.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } });

  if (!farmer) {
    return errorResponse(res, 'Invalid or expired reset token', StatusCodes.BAD_REQUEST);
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);

  // Update the farmer's password and reset token fields
  farmer.password = hashedPassword;
  farmer.resetPasswordToken = undefined;
  farmer.resetPasswordExpires = undefined;

  await farmer.save();

  return successResponse(res, 'Password reset successful', null, StatusCodes.OK);
});

// ... (your existing functions)
