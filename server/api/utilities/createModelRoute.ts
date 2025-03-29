import { Request, Response, NextFunction, Router } from "express";
import mongoose from "mongoose";
import createCRUDController from "./createController";
import Logger from "../../utils/logUtils";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface RouteMiddlewares {
  getAll?: MiddlewareFunction[];
  getMyProfile?: MiddlewareFunction[];
  getById?: MiddlewareFunction[];
  create?: MiddlewareFunction[];
  update?: MiddlewareFunction[];
  delete?: MiddlewareFunction[];
  checkIn?: MiddlewareFunction[];
  checkOut?: MiddlewareFunction[];
  updateMyProfile?: MiddlewareFunction[];
}

/**
 * Generates CRUD routes for a given model with optional middleware.
 *
 * @param app - Express application instance
 * @param routeName - The base route path (e.g., '/api/users')
 * @param Model - Mongoose model
 * @param middlewares - Optional middleware functions for different route operations
 * @param zSchema - Zod schema for request body validation
 * @param zUpdateSchema - Zod schema for update request body validation
 * @param populateQuery - Mongoose populate query
 * @returns Object with create, read, update, and delete routes
 *
 */
const createModelRoutes = (
  routeName: string,
  Model: mongoose.Model<any>,
  middlewares: RouteMiddlewares = {},
  zSchema?: any,
  zUpdateSchema?: any,
  populateQuery?: Array<any>
) => {
  const controller = createCRUDController(
    Model,
    zSchema,
    zUpdateSchema,
    populateQuery
  );
  const router = Router();
  // GET ALL
  router.get(routeName, ...(middlewares.getAll || []), controller.getAll);

  // GET BY ID
  router.get(
    `${routeName}/:id`,
    ...(middlewares.getById || []),
    controller.getById
  );

  // CREATE
  router.post(routeName, ...(middlewares.create || []), controller.create);

  // UPDATE
  router.patch(
    `${routeName}/:id`,
    ...(middlewares.update || []),
    controller.update
  );

  // DELETE
  router.delete(
    `${routeName}/:id`,
    ...(middlewares.delete || []),
    controller.delete
  );
  //Logger.info(`Creating routes for ${routeName}`);
  return router;
};

export default createModelRoutes;
