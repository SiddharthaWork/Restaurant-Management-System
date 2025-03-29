import createModelRoutes from "../utilities/createModelRoute";

import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import Stock from "../models/stock.model";
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;

const routeName = "/stock";
const router = createModelRoutes(routeName, Stock, {
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "READ",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "READ",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
});
export default router;