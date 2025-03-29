import createModelRoutes from "../utilities/createModelRoute";

import Item, { ItemCategoryModel } from "../models/item.model";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import { Router } from "express";
import { payementMode } from "../models/expense.model";
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;

const router = Router();
const routeName = "/item";

//* Item Type
const itemTypeRouter = createModelRoutes(routeName + "/type", Item, {
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "WRITE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "UPDATE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "DELETE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
});
router.use(itemTypeRouter);

//* Item Category
const itemCategory = createModelRoutes(
  routeName + "/category",
  ItemCategoryModel,
  {
    create: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "WRITE",
        PERMISSIONSUBMODULES.Purchase
      ),
    ],
    getAll: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "READ",
        PERMISSIONSUBMODULES.Purchase
      ),
    ],
    getById: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "READ",
        PERMISSIONSUBMODULES.Purchase
      ),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "UPDATE",
        PERMISSIONSUBMODULES.Purchase
      ),
    ],

    delete: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "DELETE",
        PERMISSIONSUBMODULES.Purchase
      ),
    ],
  }
);

//* Payement Mode
const paymentMode = createModelRoutes(routeName + "/paymentmode", payementMode, {
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "WRITE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "UPDATE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],

  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "DELETE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
});

const itemRouter = createModelRoutes(routeName, Item, {
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
      "UPDATE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],

  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.InventoryManagement,
      "DELETE",
      PERMISSIONSUBMODULES.Purchase
    ),
  ],
});
router.use(itemTypeRouter);
router.use(itemCategory);
router.use(paymentMode);
router.use(itemRouter);
export default router;
