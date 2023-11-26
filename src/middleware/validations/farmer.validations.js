import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/libs/response.libs.js";

const errorFormatter = ({ msg }) => {
  return msg;
};

/**
 * @description Middleware to validate the farmer registration request
 * @returns {Array} Array of validation middlewares
 */

export const validateFarmerRegistration = [
  body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .isString()
    .withMessage("Email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password is too short. Minimum of 5 characters required"),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
    }
    next();
  },
];

/**
 * @description Middleware to validate the farmer login request
 * @returns {Array} Array of validation middlewares
 */

export const validateFarmerLogin = [
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
    }
    next();
  },
];

/**
 * @description Middleware to validate the forgot password request
 * @returns {Array} Array of validation middlewares
 */

export const validateForgotPassword = [
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
    }
    next();
  },
];

/**
 * @description Middleware to validate the reset password request
 * @returns {Array} Array of validation middlewares
 */

export const validateResetPassword = [
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  body("resetPasswordToken").notEmpty().withMessage("Reset password token is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isString()
    .withMessage("New password must be a string")
    .isLength({ min: 5 })
    .withMessage("New password is too short. Minimum of 5 characters required"),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
    }
    next();
  },
];

/**
 * @description Middleware to validate prediction request
 * @returns {Array} Array of validation middlewares
 */

export const validatePrediction = [
  body("label")
    .notEmpty()
    .withMessage("Please enter crop label.")
    .isString()
    .withMessage("Crop label must be a string"),
  body("country").notEmpty().withMessage("Please select a country").isString().withMessage("Country must be a string"),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
    }
    next();
  },
];
