import express, { Application, Request, Response, NextFunction, Router } from "express";
import Logger from "../../utils/logUtils";
import { RouteMiddlewares } from "./createModelRoute";
import { AuthenticatedRequest } from "../types/common.types";

export interface CRUDController {
  getAll: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  getById: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  getMyProfile: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  create: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  update: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  delete: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  checkIn: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  checkOut: (req: AuthenticatedRequest, res: Response) => Promise<any>;
  updateMyProfile: (req: AuthenticatedRequest, res: Response) => Promise<any>;
}

/**
 * Generates CRUD routes for a given controller with optional middleware.
 *
 * @param app - Express application instance
 * @param routeName - The base route path (e.g., '/api/users')
 * @param controller - Controller object containing CRUD operations
 * @param middlewares - Optional middleware functions for different route operations
 *
 */
const generateCRUDroutes = (
  routeName: string,
  controller: Partial<CRUDController>,
  middlewares: Partial<RouteMiddlewares>,
) => {
  const router = Router();
  //* GET ALL
  if (controller.getAll) {
    router.get(routeName, ...(middlewares.getAll || []), controller.getAll);
  }

  //* GET MY PROFILE
  if (controller.getMyProfile) {
    router.get(
      `${routeName}/me`,
      ...(middlewares.getMyProfile || []),
      controller.getMyProfile
    );
  }

  
  //* CheckIn
  if (controller.checkIn) {
    router.post(
      `${routeName.replace("/attendance", "")}/checkin`,
      ...(middlewares.checkIn || []),
      controller.checkIn
    );
  }

  //* CheckIn
  if (controller.checkOut) {
    router.post(
      `${routeName.replace("/attendance", "")}/checkout`,
      ...(middlewares.checkIn || []),
      controller.checkOut
    );
  }
  //* GET BY ID
  if (controller.getById) {
    router.get(
      `${routeName}/:id`,
      ...(middlewares.getById || []),
      controller.getById
    );
  }

  //* CREATE
  if (controller.create) {
    router.post(routeName, ...(middlewares.create || []), controller.create);
  }

  //* UPDATE MY PROFILE
  if (controller.updateMyProfile) {
    router.patch(
      `${routeName}/me`,
      ...(middlewares.updateMyProfile || []),
      controller.updateMyProfile
    );
  }
  
  //* UPDATE
  if (controller.update) {
    router.patch(
      `${routeName}/:id`,
      ...(middlewares.update || []),
      controller.update
    );
  }

  //* DELETE
  if (controller.delete) {
    router.delete(
      `${routeName}/:id`,
      ...(middlewares.delete || []),
      controller.delete
    );
  }
  //Logger.info(`Created routes for ${routeName}`);
  return router;
};

export default generateCRUDroutes;
