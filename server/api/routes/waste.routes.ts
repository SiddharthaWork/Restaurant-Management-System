import {
    WasteModel,
  wasteProductTypeModel,
  wasteSourceModel,
} from "./../models/waste.model";
import { Router } from "express";
import createModelRoutes from "../utilities/createModelRoute";
import { wasteTypeModel } from "../models/waste.model";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import { createWasteSchema, updateWasteSchema } from "../zod_schema/wasteSchema";

const { PERMISSIONMODULES } = constants;
const router = Router();
let routeName = "/waste";
const wasteTypeRouter = createModelRoutes(routeName + "/type", wasteTypeModel, {
  create: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.Settings, "WRITE"),
  ],
  getAll: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.Settings, "READ"),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.Settings, "UPDATE"),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.Settings, "DELETE"),
  ],
});
const wasteProductTypeRouter = createModelRoutes(
  routeName + "/producttype",
  wasteProductTypeModel,
  {
    create: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "WRITE"),
    ],
    getAll: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "READ"),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "UPDATE"),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "DELETE"),
    ],
  }
);
const wasteSourceRouter = createModelRoutes(
  routeName + "/source",
  wasteSourceModel,
  {
    create: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "WRITE"),
    ],
    getAll: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "READ"),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "UPDATE"),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "DELETE"),
    ],
  }
);

const wasteRouter = createModelRoutes(routeName,WasteModel,{
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.WasteManagement,
      "WRITE",
    ),
  ],
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.WasteManagement,
      "READ",
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.WasteManagement,
      "READ",
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "WRITE",
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "WRITE",
    ),
  ],
},createWasteSchema,updateWasteSchema)
router.use(wasteTypeRouter);
router.use(wasteProductTypeRouter);
router.use(wasteSourceRouter);
router.use(wasteRouter)
export default router;
