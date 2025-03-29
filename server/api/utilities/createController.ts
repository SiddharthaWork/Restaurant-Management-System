import mongoose from "mongoose";
import { Response } from "express";
import { formatResponse } from "./formatRes";
import Logger from "../../utils/logUtils";
import constants from "../constants";
import { AuthenticatedRequest } from "../types/common.types";
import { handleRestaurantAssignment } from "./restaurant";
import { buildQuery } from "./queryBuilder";

/**
 * Generates CRUD routes for a given controller with optional middleware.
 *
 * @param Model - Mongoose model
 * @param middlewares - Optional middleware functions for different route operations
 * @param zSchema - Zod schema for request body validation
 * @param zUpdateSchema - Zod schema for update request body validation
 * @returns Object with create, read, update, and delete routes
 */
const createCRUDController = (
  Model: mongoose.Model<any>,
  zSchema?: any,
  zUpdateSchema?: any,
  populateQuery?: Array<string>
) => ({
  //* Create new item
  create: async (req: AuthenticatedRequest, res: Response) => {
    try {
      let data;
      //* Validate request body using Zod schema if provided
      if (zSchema) {
        data = await zSchema.parseAsync(req.body);
      } else {
        data = req.body;
      }

      const restaurant = await handleRestaurantAssignment(req);

      //* Handle batch creation if data is an array
      if (Array.isArray(data)) {
        //* Check for duplicates in the batch
        const names = data.map((item) => item.name);
        const existingItems = await Model.find({
          name: { $in: names },
          restaurant: restaurant?.id,
        });

        if (existingItems.length > 0) {
          return formatResponse(
            res,
            400,
            false,
            `Some ${Model.modelName}s already exist.`
          );
        }

        //* Add restaurant ID to each item in the batch
        const itemsWithRestaurant = data.map((item) => ({
          ...item,
          restaurant: restaurant?.id,
        }));

        //* Insert batch data
        const savedItems = await Model.insertMany(itemsWithRestaurant);

        return formatResponse(
          res,
          201,
          true,
          `${Model.modelName}s created successfully`,
          savedItems
        );
      }

      //* Handle single creation if data is an object
      else {
        //* Check for duplicate item
        if (data.name) {
          const existingItem = await Model.findOne({
            name: data.name,
            restaurant: restaurant?.id,
          });
          if (existingItem) {
            return formatResponse(
              res,
              400,
              false,
              `${Model.modelName} already exists.`
            );
          }
        }

        //* Create new item with restaurant ID
        const newItem = new Model({
          ...data,
          restaurant: restaurant?.id,
        });

        const savedItem = await newItem.save();

        return formatResponse(
          res,
          201,
          true,
          `${Model.modelName} created successfully`,
          savedItem
        );
      }
    } catch (error: any) {
      //* Handle unique constraint violations
      if (error.code === 11000) {
        return formatResponse(
          res,
          400,
          false,
          `${Model.modelName} already exists.`
        );
      }

      return formatResponse(res, 500, false, "Error creating item(s)", error);
    }
  },

  //* Get all items
  getAll: async (req: AuthenticatedRequest, res: Response) => {
    Logger.info("Fetching all items");
    try {
      const query = buildQuery(req);

      const items = await Model.find(query).populate(populateQuery || []);

      return formatResponse(
        res,
        200,
        true,
        `${Model.modelName} retrieved successfully`,
        items
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(
        res,
        500,
        false,
        `Error fetching ${Model.modelName}`,
        error
      );
    }
  },

  //* Get item by ID
  getById: async (req: AuthenticatedRequest, res: Response) => {
    Logger.info("Fetching item by ID");
    try {
      // Validate if ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return formatResponse(
          res,
          400,
          false,
          `Invalid ${Model.modelName} ID format`
        );
      }
      let query: any = buildQuery(req);
      query._id = req.params.id;

      const item = await Model.findOne(query).populate(populateQuery || []);

      if (!item) {
        return formatResponse(res, 404, false, `${Model.modelName} not found`);
      }

      return formatResponse(
        res,
        200,
        true,
        `${Model.modelName} retrieved successfully`,
        item
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(
        res,
        500,
        false,
        `Error fetching ${Model.modelName}`,
        error
      );
    }
  },

  //* Update item
  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      let query: any = buildQuery(req);
      query._id = req.params.id;

      let data;
      //* Validate request body using Zod schema if provided
      if (zUpdateSchema) {
        data = await zUpdateSchema.parseAsync(req.body);
      } else {
        data = req.body;
      }

      //* Prevent changing restaurant ID for non-super admins
      if (req.body.restaurant && !req.user?.isSuperAdmin) {
        delete req.body.restaurant;
      }

      //* Handle batch update if data is an array
      if (Array.isArray(data)) {
        const updatedItems = await Promise.all(
          data.map(async (item) => {
            const updatedItem = await Model.findByIdAndUpdate(item._id, item, {
              new: true,
              runValidators: true,
            }).populate(populateQuery || []);

            if (!updatedItem) {
              throw new Error(`${Model.modelName} not found`);
            }

            return updatedItem;
          })
        );

        return formatResponse(
          res,
          200,
          true,
          `${Model.modelName}s updated successfully`,
          updatedItems
        );
      }

      //* Handle single update if data is an object
      else {
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, data, {
          new: true,
          runValidators: true,
        }).populate(populateQuery || []);

        if (!updatedItem) {
          return formatResponse(
            res,
            404,
            false,
            `${Model.modelName} not found`
          );
        }

        return formatResponse(
          res,
          200,
          true,
          `${Model.modelName} updated successfully`,
          updatedItem
        );
      }
    } catch (error: any) {
      //* Handle unique constraint violations
      if (error.code === 11000) {
        return formatResponse(
          res,
          400,
          false,
          `${Model.modelName} already exists.`
        );
      }

      return formatResponse(res, 500, false, "Error updating item(s)", error);
    }
  },

  //* Delete item
  delete: async (req: AuthenticatedRequest, res: Response) => {
    try {
      let query: any = buildQuery(req);

      query._id = req.params.id;

      const deletedItem = await Model.findOneAndDelete(query);

      if (!deletedItem) {
        return formatResponse(res, 404, false, `${Model.modelName} not found`);
      }

      return formatResponse(
        res,
        200,
        true,
        `${Model.modelName} deleted successfully`
      );
    } catch (error) {
      return formatResponse(res, 500, false, "Error deleting item", error);
    }
  },
});

export default createCRUDController;
