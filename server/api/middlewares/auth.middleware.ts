import { AuthenticatedRequest } from './../types/common.types';
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import constants from "../constants";
import { formatResponse } from "../utilities/formatRes";
import { IUser } from '../types/user.types';



//* Middleware to protect routes
const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    formatResponse(res, 401, false, "Authentication required.");
    return;
  }

  try {
    const decoded = jwt.verify(token, constants.JWT_SECRET) as Partial<IUser>;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid token.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export default {
  authenticate,
};
