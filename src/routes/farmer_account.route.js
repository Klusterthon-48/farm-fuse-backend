import { Router } from "express";

// sample import from controllers
import {
  accessDashboard,
  authenticateFarmer,
  createNewFarmer,
} from "../controllers/farmer_account.controller.js";

// Sample router
const userRouter = Router();

// sample route
userRouter.post("/register", createNewFarmer);
userRouter.post("/login", authenticateFarmer);
userRouter.get("/dashboard", accessDashboard);

export default userRouter;
