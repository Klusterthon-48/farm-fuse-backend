import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/libs/response.libs.js";
import tryCatchLibs from "../utils/libs/tryCatch.libs.js";
import farmerModel from "../models/farmer_account.model.js";
import { hashPassword, comparePasswords } from "../utils/libs/bcryptUtils.js";
import { generateResetToken, signToken, verifyToken } from "../utils/libs/jwtUtils.js";
import { sendPasswordResetEmail } from "../utils/libs/emailUtils.js";

// Sample Function to create a new farmer
export const createNewFarmer = tryCatchLibs(async (req, res) => {
  const { name, email, password } = req.body;

  const existingFarmer = await farmerModel.findOne({ email });
  if (existingFarmer) {
    return errorResponse(res, "Email already exists", StatusCodes.CONFLICT);
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new farmer with the hashed password
  await farmerModel.create({ name, email, password: hashedPassword });

  return successResponse(res, "Farmer created", StatusCodes.CREATED);
});






export const authenticateFarmer = tryCatchLibs(async (req, res) => {
  const {email, password } = req.body;

  const farmer = await farmerModel.findOne({ email });
  if (!farmer) {
    return errorResponse(res, "Email does not exist", StatusCodes.NOT_FOUND);
  }

  const passwordMatch = await comparePasswords(password, farmer.password);

  if (!passwordMatch) {
    return errorResponse(res, "Invalid password", StatusCodes.UNAUTHORIZED);
  }

  // If the username and password are valid, create and sign a JWT token
  const token = signToken({ email: farmer.email });

  delete farmer.password;

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
    farmerEmail: decodedToken.email,
  };

  return successResponse(res, "Access granted", dataFromDatabase, StatusCodes.OK);
});






export const forgotPassword = tryCatchLibs(async (req, res) => {
  const { email } = req.body;

  const farmer = await farmerModel.findOne({ email });

  if (!farmer) {
    return errorResponse(res, "No account found with that email address", StatusCodes.NOT_FOUND);
  }

  // Generate a unique token for password reset (you need to implement this function)
  const resetToken = generateResetToken();

  // Save the reset token and its expiration time to the farmer document
  farmer.resetPasswordToken = resetToken;

  // Token expires in 10 minutes
  farmer.resetPasswordExpires = Date.now() + 600000;

  await farmer.save();

  // Send a password reset email to the farmer
  try {
    await sendPasswordResetEmail(farmer.email, farmer.name, resetToken);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return errorResponse(res, "Error sending password reset email", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return successResponse(res, "Password reset email sent successfully", null, StatusCodes.OK);
});

// ... (your existing imports)

export const resetPassword = tryCatchLibs(async (req, res) => {
  const { resetPasswordToken, email, newPassword } = req.body;

  if (!resetPasswordToken || !email || !newPassword) {
    return errorResponse(res, "Provide missing values", StatusCodes.BAD_REQUEST);
  }

  const farmer = await farmerModel.findOne({ email });
  if (!farmer) {
    return errorResponse(res, "No account found with that email address", StatusCodes.NOT_FOUND);
  }

  // Check if the reset token is valid
  if (resetPasswordToken !== farmer.resetPasswordToken) {
    return errorResponse(res, "Invalid reset token", StatusCodes.UNAUTHORIZED);
  }

  // Check if the reset token has expired
  if (Date.now() > farmer.resetPasswordExpires) {
    return errorResponse(res, "Reset token has expired. Generate a new one", StatusCodes.UNAUTHORIZED);
  }

  // check if password is the same as the old password
  const passwordMatch = await comparePasswords(newPassword, farmer.password);
  if (passwordMatch) {
    return errorResponse(res, "New password cannot be the same as the old password", StatusCodes.BAD_REQUEST);
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);

  // Update the farmer's password
  farmer.password = hashedPassword;

  // Clear the reset token and its expiration time
  farmer.resetPasswordToken = "";
  farmer.resetPasswordExpires = null;

  await farmer.save();

  return successResponse(res, "Password reset successful. Login with your new Password", null, StatusCodes.OK);
});

// ... (your existing functions)
