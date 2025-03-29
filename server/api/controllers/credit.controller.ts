//getMyCredit

import { Response } from "express";
import Credit from "../models/credit.model";
import { formatResponse } from "../utilities/formatRes";
import { AuthenticatedRequest } from "../types/common.types";

export const getMyCredit = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const myCredit = await Credit.find({ user: req.user?.id }).populate([
      {
        path: "creditRepaymentMethod",
        select: "name",
      },
      {
        path: "creditRepaymentFrequency",
        select: "name",
      },
    ]);
    if (!myCredit) {
      return formatResponse(res, 404, false, "Credit not found");
    }
    return formatResponse(res, 200, true, "Success", myCredit);
  } catch (error) {
    return formatResponse(res, 500, false, "Internal Server Error", error);
  }
};


