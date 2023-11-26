import { Router } from "express";

import { getPrediction, getWeatherData } from "../controllers/prediction.controller.js";

import { authenticateFarmer } from "../middleware/authorization/farmer.authorization.js";
import { validatePrediction } from "../middleware/validations/farmer.validations.js";

const predictionRouter = Router();

predictionRouter.post("/predict", authenticateFarmer, validatePrediction, getPrediction);
predictionRouter.get("/weather", getWeatherData);

export default predictionRouter;
