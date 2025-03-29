import createModelRoutes from "../utilities/createModelRoute";

import Vendor, { BusinessTypeModel } from "../models/vendor.model";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import { Router } from "express";
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;

const router = Router();
const routeName = "/vendor";

//* Vendor
const vendorRotuer = createModelRoutes(routeName, Vendor, {
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Vendor
    ),
  ],
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "READ",
      PERMISSIONSUBMODULES.Vendor
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "UPDATE",
      PERMISSIONSUBMODULES.Vendor
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "DELETE",
      PERMISSIONSUBMODULES.Vendor
    ),
  ],
});

//* Business type
const businessTypeRouter = createModelRoutes(
  routeName + "/businesstype",
  BusinessTypeModel,
  {
    create: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "WRITE",
        PERMISSIONSUBMODULES.BusinessType
      ),
    ],
    getAll: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "READ",
        PERMISSIONSUBMODULES.BusinessType
      ),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "UPDATE",
        PERMISSIONSUBMODULES.BusinessType
      ),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "DELETE",
        PERMISSIONSUBMODULES.BusinessType
      ),
    ],
  }
);
router.use(businessTypeRouter);
router.use(vendorRotuer);

export default router;
