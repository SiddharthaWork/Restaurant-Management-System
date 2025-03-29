import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Logger from "./logUtils";
import { formatResponse } from "../api/utilities/formatRes";
import { MulterError } from "multer";

// Main error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.error("Error caught in global handler:", err);

  let statusCode = 500;
  let errorMessage = "Internal server error";

  // Handle Multer-specific errors
  if (err instanceof MulterError) {
    statusCode = 400;
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        errorMessage = "File size exceeds the allowed limit";
        break;
      case "LIMIT_FILE_COUNT":
        errorMessage = "Too many files uploaded";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        errorMessage = "Unexpected field name in form data";
        break;
      default:
        errorMessage = "Error processing uploaded file";
    }
  }
  // Handle Mongoose validation errors
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorMessage = "Validation failed";
  }
  // Handle file type/extension errors
  else if (
    err.message?.includes("file type") ||
    err.message?.includes("file extension")
  ) {
    statusCode = 400;
    errorMessage = err.message;
  }
  // Handle Cloudinary upload errors
  else if (err.message?.includes("Failed to upload image")) {
    statusCode = 500;
    errorMessage = "Failed to upload image to cloud storage";
  }

  // Use the formatResponse utility to send the error response
  formatResponse(res, statusCode, false, errorMessage, err);
};
