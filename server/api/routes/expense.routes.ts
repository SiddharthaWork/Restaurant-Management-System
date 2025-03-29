import { payementMode } from './../models/expense.model';
import createModelRoutes from "../utilities/createModelRoute";

import { Expense, ExpenseCategory } from "../models/expense.model";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import { Router } from "express";
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;

const router = Router();
const routeName = "/expense";

//* Expense Category
const expenseCategoryRouter = createModelRoutes(routeName + "/category", ExpenseCategory, {
    create: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.Settings,
            "WRITE",
            PERMISSIONSUBMODULES.ExpenseCategory
        ),
    ],
    getAll: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.Settings,
            "READ",
            PERMISSIONSUBMODULES.ExpenseCategory
        ),
    ],
    update: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.Settings,
            "UPDATE",
            PERMISSIONSUBMODULES.ExpenseCategory
        ),
    ],
    delete: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.Settings,
            "DELETE",
            PERMISSIONSUBMODULES.ExpenseCategory
        ),
    ],
});
router.use(expenseCategoryRouter);

//* Payement Method
const payementModeRouter = createModelRoutes(routeName + "/paymentmode", payementMode, {
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
    ]
})
router.use(payementModeRouter);
//* Expense
const expenseRouter = createModelRoutes(routeName, Expense, {
    create: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.FinanceSales,
            "WRITE",
            PERMISSIONSUBMODULES.Expense
        ),
    ],
    getAll: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.FinanceSales,
            "READ",
            PERMISSIONSUBMODULES.Expense
        ),
    ],
    update: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.FinanceSales,
            "UPDATE",
            PERMISSIONSUBMODULES.Expense
        ),
    ],
    delete: [
        authMiddleware.authenticate,
        checkPermission(
            PERMISSIONMODULES.FinanceSales,
            "DELETE",
            PERMISSIONSUBMODULES.Expense
        ),
    ],
});
router.use(expenseRouter);
export default router;

