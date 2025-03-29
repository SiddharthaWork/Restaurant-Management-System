import { Router } from "express";

import createModelRoute, {
  RouteMiddlewares,
} from "../utilities/createModelRoute";
import createControllerRoute from "../utilities/createControllerRoute";
import authMiddleware from "../middlewares/auth.middleware";
import {
  Department,
  EmpRole,
  EmpShiftType,
  Position,
} from "../models/employee.model";
import employeeController from "../controllers/employee.controller";
import attendanceController from "../controllers/attandance.controller";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";

/**
 * Central routing configuration for user-related models
 *
 * Utilizes a generic route and controller creator to set up CRUD endpoints for various
 * user management entities with admin-level access control.
 *
 * * Generated Routes
 * @getAll
 * @getById
 * @create
 * @update
 * @delete
 *
 * * Middleware can be applied to each route using middlewareObj
 *
 */
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;
const router = Router();
let middlewareObj: RouteMiddlewares = {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "READ",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "READ",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  getMyProfile: [
    authMiddleware.authenticate
  ],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "UPDATE",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "DELETE",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  updateMyProfile: [authMiddleware.authenticate],
};
let routeName;
const routeHeader = "/user";

//* EMPLOYEE
routeName = `${routeHeader}/profile`;
const employeeRoute = createControllerRoute(
  routeName,
  employeeController,
  middlewareObj
);
router.use(employeeRoute);

//* EMPLOYEE SUB INFO
//* Middleware setup for employee sub info
middlewareObj = {
  getAll: [authMiddleware.authenticate],
  getById: [authMiddleware.authenticate],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "WRITE",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "UPDATE",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "DELETE",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
};
//* EmpShiftType
routeName = routeHeader + "/shift";
const empShiftRouter = createModelRoute(routeName, EmpShiftType, middlewareObj);
router.use(empShiftRouter);

//* Department
routeName = routeHeader + "/department";
const departmentRouter = createModelRoute(routeName, Department, middlewareObj);
router.use(departmentRouter);

//* POSITION
routeName = routeHeader + "/position";
const positionRouter = createModelRoute(routeName, Position, middlewareObj);
router.use(positionRouter);
//* EMPROLE
routeName = routeHeader + "/role";
const empRoleRouter = createModelRoute(routeName, EmpRole, middlewareObj);
router.use(empRoleRouter);
//* ATTENDANCE
const attendanceRouter = createControllerRoute(
  "/attendance",
  attendanceController,
  {
    getAll: [authMiddleware.authenticate],
    getById: [authMiddleware.authenticate],
    create: [authMiddleware.authenticate],
    update: [authMiddleware.authenticate],
    delete: [authMiddleware.authenticate],
    checkIn: [authMiddleware.authenticate],
    checkOut: [authMiddleware.authenticate],
  }
);
router.use(attendanceRouter);

export default router;
