import { Router } from "express";
import createModelRoutes from "../utilities/createModelRoute";
import { ReservationType } from "../models/reservation.model";
import createControllerRoutes from "../utilities/createControllerRoute";
import authMiddleware from "../middlewares/auth.middleware";
import { checkPermission } from "../middlewares/permission.middleware";
import constants from "../constants";
import reservationController from "../controllers/reservation.controller";

const routeName = "/reservation";
const router = Router();
const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = constants;
//* ReservationType
const reservationTypeRouter = createModelRoutes(
  routeName + "/type",
  ReservationType,
  {
    getAll: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "READ",
        PERMISSIONSUBMODULES.ReservationType
      ),
    ],
    getById: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "READ",
        PERMISSIONSUBMODULES.ReservationType
      ),
    ],
    create: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "WRITE",
        PERMISSIONSUBMODULES.ReservationType
      ),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "UPDATE",
        PERMISSIONSUBMODULES.ReservationType
      ),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "DELETE",
        PERMISSIONSUBMODULES.ReservationType
      ),
    ],
  }
);
router.use(reservationTypeRouter);
//* Reservation
const reservationRouter = createControllerRoutes(
  routeName,
  reservationController,
  {
    getAll: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "READ",
        PERMISSIONSUBMODULES.Reservation
      ),
    ],
    create: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "WRITE",
        PERMISSIONSUBMODULES.Reservation
      ),
    ],
    update: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "UPDATE",
        PERMISSIONSUBMODULES.Reservation
      ),
    ],
    delete: [
      authMiddleware.authenticate,
      checkPermission(
        PERMISSIONMODULES.TableReservation,
        "DELETE",
        PERMISSIONSUBMODULES.Reservation
      ),
    ],
  }
);
router.use(reservationRouter);

export default router;
