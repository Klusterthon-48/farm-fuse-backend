import { Router } from "express";

// sample import from controllers
import {
  accessDashboard,
  authenticateFarmer,
  createNewFarmer,
  forgotPassword,
  resetPassword,
} from "../controllers/farmer_account.controller.js";

// Sample router
const userRouter = Router();

// sample route
userRouter.post("/register", createNewFarmer);
userRouter.post("/login", authenticateFarmer);
userRouter.get("/dashboard", accessDashboard);
userRouter.post("/forgot_password", forgotPassword)
userRouter.get("reset_password", resetPassword)

export default userRouter;
