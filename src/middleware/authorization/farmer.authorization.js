import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/libs/response.libs.js";
import { verifyToken } from "../../utils/libs/jwtUtils.js";
import farmerModel from "../../models/farmer_account.model.js";

/**
 * @description Middleware to authenticate a farmer
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next middleware function
 * @returns {Promise<Response>} Express response object
 */

export const authenticateFarmer = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return errorResponse(res, "Authorization header not found", StatusCodes.UNAUTHORIZED);
    }

    // Get the token from the request header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return errorResponse(res, "Token not found", StatusCodes.UNAUTHORIZED);
    }

    // Verify the token
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return errorResponse(res, "Invalid token", StatusCodes.FORBIDDEN);
    }

    // Check if the farmer exists
    const farmer = await farmerModel.findOne({ email: decodedToken.email });

    // Set the farmer details in the request object
    req.farmer = farmer;

    // Call the next middleware function
    next();
  } catch (error) {
    console.error("Error authenticating farmer:", error);
    return errorResponse(res, "Error authenticating farmer", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
