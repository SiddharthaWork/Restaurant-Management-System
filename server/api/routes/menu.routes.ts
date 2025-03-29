import { beverageSizeModel, foodSizeModel } from './../models/menu.model';
import { upload } from "./../utilities/multer";
import createCRUDRoutes from "../utilities/createControllerRoute";
import authMiddleware from "../middlewares/auth.middleware";
import MenuCategoryController from "../controllers/menuCategory.controller";
import { Router } from "express";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import MenuItemController from "../controllers/menuItem.controller";
import createModelRoutes from '../utilities/createModelRoute';

let routeName = "/menu/category";
const router = Router();
const { PERMISSIONSUBMODULES, PERMISSIONMODULES } = constants;
const menuCategoryRouter = createCRUDRoutes(routeName, MenuCategoryController, {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "READ",
      PERMISSIONSUBMODULES.MenuCategory
    ),
  ],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "WRITE",
      PERMISSIONSUBMODULES.MenuCategory
    ),
    upload.array("photos"),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "UPDATE",
      PERMISSIONSUBMODULES.MenuCategory
    ),
    upload.array("photos"),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "DELETE",
      PERMISSIONSUBMODULES.MenuCategory
    ),
  ],
  getMyProfile: [authMiddleware.authenticate],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "READ",
      PERMISSIONSUBMODULES.MenuCategory
    ),
  ],
});
routeName = "/menu";
const menuRouter = createCRUDRoutes(routeName, MenuItemController, {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "READ",
      PERMISSIONSUBMODULES.Menu
    ),
  ],
  create: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "WRITE",
      PERMISSIONSUBMODULES.Menu
    ),
    upload.array("photos", 5),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "UPDATE",
      PERMISSIONSUBMODULES.Menu
    ),
    upload.array("photos", 5),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "DELETE",
      PERMISSIONSUBMODULES.Menu
    ),
  ],
  getMyProfile: [authMiddleware.authenticate],
  getById: [
    authMiddleware.authenticate,
    checkPermission(
      PERMISSIONMODULES.MenuManagement,
      "READ",
      PERMISSIONSUBMODULES.Menu
    ),
  ],
});

const foodSizeRouter = createModelRoutes(
  routeName + "/foodsize",
  foodSizeModel,
  {
    getAll: [
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
      upload.array("photos", 5),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "UPDATE",
      ),
      upload.array("photos", 5),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.Settings,
        "DELETE",
      ),
    ],
    getMyProfile: [authMiddleware.authenticate],
    getById: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.MenuManagement,
        "READ",
      ),
    ],
  }
);

const beverageSizeRouter = createModelRoutes(
  routeName + "/beveragesize",
  beverageSizeModel,
  {
    getAll: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "READ"),
    ],
    create: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "WRITE"),
      upload.array("photos", 5),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "UPDATE"),
      upload.array("photos", 5),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.Settings, "DELETE"),
    ],
    getMyProfile: [authMiddleware.authenticate],
    getById: [
      authMiddleware.authenticate,
      checkPermission(PERMISSIONMODULES.MenuManagement, "READ"),
    ],
  }
);

router.use(menuCategoryRouter);
router.use(foodSizeRouter);
router.use(beverageSizeRouter);
router.use(menuRouter);
export default router;
