import createModelRoutes from "../utilities/createModelRoute";

import { Order } from "../models/order.model";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../zod_schema/orderSchema";
import { Router } from "express";
import {
  addItemToOrder,
  removeMenuItems,
} from "../controllers/order.controller";
const { PERMISSIONMODULES } = constants;

const routeName = "/order";
const router = Router();
router.put(
  routeName + "/additems/:id",
  authMiddleware.authenticate,
  addItemToOrder
);
router.delete(
  routeName + "/removeitems/:id",
  authMiddleware.authenticate,
  removeMenuItems
);

const orderRouter = createModelRoutes(
  routeName,
  Order,
  {
    getAll: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.OrderManagement, "READ"),
    ],
    getById: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.OrderManagement, "READ"),
    ],
    create: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.OrderManagement, "WRITE"),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.OrderManagement, "UPDATE"),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.OrderManagement, "DELETE"),
    ],
  },
  createOrderSchema,
  updateOrderSchema
);
router.use(orderRouter);
export default router;
