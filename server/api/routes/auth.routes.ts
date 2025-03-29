import { Application, Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { upload } from "../utilities/multer";
import constants from "../constants";

const router = Router();
router.post(
  "/register",
  authMiddleware.authenticate,
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "docs", maxCount: constants.MAXUSERDOCSIZE },
  ]),
  authController.register
);
router.post("/login", authController.login);
export default router;
