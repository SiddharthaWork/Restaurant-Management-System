import { Application, Response, Router } from "express";

import createModelRoute, {
  RouteMiddlewares,
} from "../utilities/createModelRoute";
import Credit, {
  CreditRepaymentFrequency,
  CreditRepaymentMethod,
} from "../models/credit.model";
import constants from "../constants";
import authMiddleware from "../middlewares/auth.middleware";
import { creditSchema, updateCreditSchema } from "../zod_schema/creditSchema";
import { getMyCredit } from "../controllers/credit.controller";
import { AuthenticatedRequest } from "../types/common.types";
import { checkPermission } from "../middlewares/permission.middleware";

const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;

const router = Router();
let routeHeader = "/credit";
let routeName;
let middlewareObj: RouteMiddlewares;
middlewareObj = {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.Settings,
      "READ",
      PERMISSIONSUBMODULES.Employee
    ),
  ],
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

//* CREDIT REPAYMENT METHOD
routeName = routeHeader + "/repaymentmethod";
const repayementRoute = createModelRoute(
  routeName,
  CreditRepaymentMethod,
  middlewareObj
);
router.use(repayementRoute);

//* CREDIT REPAYMENT FREQUENCY
routeName = routeHeader + "/repaymentfrequency";
const repaymentFrequencyRoute = createModelRoute(
  routeName,
  CreditRepaymentFrequency,
  middlewareObj
);
router.use(repaymentFrequencyRoute);

middlewareObj = {
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
      PERMISSIONSUBMODULES.Credit
    ),
  ],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Credit
    ),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "UPDATE",
      PERMISSIONSUBMODULES.Credit
    ),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.EmployeeManagement,
      "DELETE",
      PERMISSIONSUBMODULES.Credit
    ),
  ],
};

//* GET MY CREDIT
routeName = routeHeader + "/my";
router.get(
  routeName,
  [authMiddleware.authenticate],
  (req: AuthenticatedRequest, res: Response) => {
    getMyCredit(req, res);
  }
);

//* CREDIT
routeName = routeHeader;
const creditRoute = createModelRoute(
  routeName,
  Credit,
  middlewareObj,
  creditSchema,
  updateCreditSchema,
  [
    {
      path: "user",
      select: "name",
    },
    {
      path: "restaurant",
      select: "name",
    },
    {
      path: "creditRepaymentMethod",
      select: "name",
    },
    {
      path: "creditRepaymentFrequency",
      select: "name",
    },
  ]
);
router.use(creditRoute);
export default router;
