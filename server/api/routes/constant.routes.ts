import { Router } from "express";
import { AuthenticatedRequest } from "../types/common.types";
import { formatResponse } from "../utilities/formatRes";
import constants from "../constants";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
router.get("/constant", authMiddleware.authenticate,async (req: AuthenticatedRequest, res) => {
    if(!req.user || !req.user?.isSuperAdmin){
        formatResponse(res,403,false,"Unauthorized access.");
        return
    }
  try {
    formatResponse(res,200,true,"Successful.",constants)
  } catch (error) {
    formatResponse(res,500,false,"Internal Server Error.",error);
  }
});
export default router;
