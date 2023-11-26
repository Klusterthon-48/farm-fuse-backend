import { Router } from "express";

// sample import from controllers
import {
  accessDashboard,
  authenticateFarmer,
  createNewFarmer,
  forgotPassword,
  resetPassword,
} from "../controllers/farmer_account.controller.js";

import {
  validateFarmerRegistration,
  validateFarmerLogin,
  validateForgotPassword,
  validateResetPassword,
} from "../middleware/validations/farmer.validations.js";

// Sample router
const userRouter = Router();

// sample route
userRouter.post("/register", validateFarmerRegistration, createNewFarmer);
userRouter.post("/login", validateFarmerLogin, authenticateFarmer);
userRouter.get("/dashboard", accessDashboard);
userRouter.post("/forgot_password", validateForgotPassword, forgotPassword);
userRouter.post("/reset_password", validateResetPassword, resetPassword);

export default userRouter;
