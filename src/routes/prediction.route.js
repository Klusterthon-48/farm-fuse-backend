import { Router } from "express";

import { getPrediction } from "../controllers/prediction.controller.js";

const predictionRouter = Router();

predictionRouter.post("/predict", getPrediction);

export default predictionRouter;
