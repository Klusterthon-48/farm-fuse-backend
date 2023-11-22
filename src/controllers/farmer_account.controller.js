import { StatusCodes } from "http-status-codes";
import farmerSchema from "../models/farmer_account.model.js";
import { errorResponse, successResponse } from "../utils/libs/response.libs.js";
import tryCatchLibs from "../utils/libs/tryCatch.libs.js";

// Sample Function to create a new farmer
export const createNewFarmer = tryCatchLibs(async (req, res) => {
  const { name, username, password } = req.body;

  const farmer = await farmerSchema.findOne({ username });
  if (!farmer) return errorResponse(res, "Username does not exist", StatusCodes.NOT_FOUND);

  if (farmer) return errorResponse(res, "Username exists", StatusCodes.CONFLICT);

  const newFarmer = await farmerSchema.create({ name, username, password });

  return successResponse(res, "Farmer created", newFarmer, StatusCodes.CREATED);
});
