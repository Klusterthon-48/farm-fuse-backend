import { Router } from "express";

import userRouter from "./farmer_account.route.js";
import predictionRouter from "./prediction.route.js";

const route = Router();

route.use(userRouter);
route.use(predictionRouter);

export default route;
