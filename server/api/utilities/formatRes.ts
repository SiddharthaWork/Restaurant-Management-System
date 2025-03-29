import { Response } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export interface ErrorDetail {
  field?: string;
  message: string;
}

export const formatResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
): void => {
  const responseData: ResponseData = {
    success,
    message,
  };
  let status = statusCode;
  if (data) {
    if (success) {
      responseData.data = data;
    } else {
      if (data instanceof ZodError) {
        responseData.message = "Validation error";
        status = 400;
      }else if(data instanceof mongoose.Error.ValidationError){
        console.error(data);
        responseData.message = "Validation error";
        status = 400;
      }
      responseData.error = formatErrors(data);
      if (status === 500) {
        console.error(data);
        if (process.env.NODE_ENV === "production") {
          responseData.error = "An unknown error occurred";
        }
      }
    }
  }

  res.status(status).json(responseData);
};

const formatErrors = (error: any): ErrorDetail[] => {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }
  if (error instanceof Error) {
    return [{ message: error.message }];
  }
  return [{ message: "An unknown error occurred" }];
};
