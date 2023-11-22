import { StatusCodes } from "http-status-codes";
import farmerSchema from "../models/farmer_account.model.js";
import { errorResponse, successResponse } from "../utils/libs/response.libs.js";
import tryCatchLibs from "../utils/libs/tryCatch.libs.js";
import farmerModel from "../models/farmer_account.model.js";
import {hashPassword, comparePasswords} from "../utils/libs/bcryptUtils.js"
import { signToken, verifyToken } from "../utils/libs/jwtUtils.js";

// Sample Function to create a new farmer
export const createNewFarmer = tryCatchLibs(async (req, res) => {
  const { name, username, password } = req.body;

  // Check if the username already exists
  const existingFarmer = await farmerSchema.findOne({ username });
  if (existingFarmer) {
    return errorResponse(res, "Username already exists", StatusCodes.CONFLICT);
  }

  // If the username doesn't exist, create a new farmer
  const newFarmer = await farmerSchema.create({ name, username, password });

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