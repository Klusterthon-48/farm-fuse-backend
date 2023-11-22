import { Router } from "express";

import userRouter from "./farmer_account.route.js";

const route = Router();

route.use("/farmer", userRouter);

export default route;
