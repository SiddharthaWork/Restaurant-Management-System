
import authMiddleware from "../middlewares/auth.middleware";
import RestaurantController from "../controllers/restaurant.controller";
import createCRUDRoutes from "../utilities/createControllerRoute";
import { upload } from "../utilities/multer";

const routeName = "/restaurant";
const router = createCRUDRoutes(routeName, RestaurantController, {
  getAll: [authMiddleware.authenticate],
  create: [authMiddleware.authenticate, upload.single("logo")],
  update: [authMiddleware.authenticate],
  delete: [authMiddleware.authenticate],
  getMyProfile: [authMiddleware.authenticate],
  getById: [authMiddleware.authenticate],
});
export default router;
