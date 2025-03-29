import createControllerRoutes from "../utilities/createControllerRoute";
import authMiddleware from "../middlewares/auth.middleware";
import permissionController from "../controllers/permission.controller";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";

const routeName = "/permission";
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;
const router = createControllerRoutes(routeName, permissionController, {
  getAll: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.PermissionManagement, "READ"),
  ],
  update: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.PermissionManagement, "READ"),
  ],
  delete: [
    authMiddleware.authenticate,
    checkPermission(PERMISSIONMODULES.PermissionManagement, "READ"),
  ],
});
export default router;
