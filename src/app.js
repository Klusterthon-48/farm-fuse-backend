import express from "express";
import morgan from "morgan";
import cors from "cors";

import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "./utils/libs/response.libs.js";

const app = express();

//import routes
// import routes from "./routes/index.js";

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
// app.use("/api", routes);

// index route
app.get("/", (_req, res) => {
  successResponse(res, "Welcome to Farm Fuse API", StatusCodes.OK);
});

// catch 404 errors and forward them to error handler
app.use((_req, _res, next) => {
  const error = new Error("Not Found");
  error.status = StatusCodes.NOT_FOUND;
  next(error);
});

// error handler function
app.use((error, _req, res, _next) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
