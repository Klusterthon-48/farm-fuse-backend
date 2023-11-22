import { Router } from "express";

// sample import from controllers
import { createNewFarmer } from "../controllers/farmer_account.controller.js";

// Sample router
const userRouter = Router();

// sample route
userRouter.post("/signup", createNewFarmer);

export default userRouter;
