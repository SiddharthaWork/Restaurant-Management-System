import { Router } from "express";
import createModelRoutes, {
  RouteMiddlewares,
} from "../utilities/createModelRoute";
import { floorPlan, Table } from "../models/table.model";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import { tableSchema } from "../zod_schema/tableSchema";

const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;
let routeName, middlewareObj: RouteMiddlewares;
routeName = "/table";
const router = Router();
middlewareObj = {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
    ),
  ],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "WRITE",
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "UPDATE",
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "DELETE",
    ),
  ],
};
const floorRouter = createModelRoutes(routeName + "/floor", floorPlan,middlewareObj);
middlewareObj = {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.TableReservation,
      "READ",
      PERMISSIONSUBMODULES.Table
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.TableReservation,
      "READ",
      PERMISSIONSUBMODULES.Table
    ),
  ],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.TableReservation,
      "WRITE",
      PERMISSIONSUBMODULES.Table
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.TableReservation,
      "UPDATE",
      PERMISSIONSUBMODULES.Table
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.TableReservation,
      "DELETE",
      PERMISSIONSUBMODULES.Table
    ),
  ],
};
const tableRouter = createModelRoutes(
  routeName,
  Table,
  middlewareObj,
  tableSchema,
  "",
  ["floorPlan","reservation"]
);
router.use(floorRouter);
router.use(tableRouter);

export default router;
