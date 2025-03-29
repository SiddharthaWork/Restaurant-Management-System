import { Response } from "express";

import { formatResponse } from "../utilities/formatRes";
import RestaurantModel from "../models/restaurant.model";
import Logger from "../../utils/logUtils";

import {
  RestaurantCreateSchema,
  RestaurantUpdateSchema,
} from "../zod_schema/restaurantSchema";
import { AuthenticatedRequest } from "../types/common.types";
import { handleRestaurantLogo } from "../utilities/restaurant";
import cloudinary from "../../config/cloudinary";

const validateSuperAdmin = (
  req: AuthenticatedRequest,
  res: Response
): boolean => {
  if (!req.user?.isSuperAdmin) {
    formatResponse(res, 403, false, "Only superadmin can perform this action");
    return false;
  }
  return true;
};
const RestaurantController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!validateSuperAdmin(req, res)) return;

      const data = await RestaurantCreateSchema.parseAsync(req.body);
      const { name, subStart, subEnd } = data;

      const existingRestaurant = await RestaurantModel.findOne({ name });
      if (existingRestaurant) {
        return formatResponse(
          res,
          400,
          false,
          "Restaurant with this name already exists"
        );
      }

      const files = req.file as
      | { [fieldname: string]: Express.Multer.File[] }  
      | undefined;
      const logoResult = await handleRestaurantLogo(files, name);
      if (!logoResult.success) {
        return formatResponse(res, 400, false, logoResult.message as string);
      }

      const newRestaurant = new RestaurantModel({
        name,
        logo: logoResult.url,
        address: data.address || "",
        phone: data.phone || "",
        description: data.description || "",
        subStart: new Date(subStart),
        subEnd: new Date(subEnd),
      });

      const savedRestaurant = await newRestaurant.save();
      return formatResponse(
        res,
        201,
        true,
        "Restaurant created successfully",
        savedRestaurant
      );
    } catch (error) {
      Logger.error("Restaurant creation error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error creating restaurant",
        error
      );
    }
  },

  getAll: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!validateSuperAdmin(req, res)) return;

      const restaurants = await RestaurantModel.find();
      return formatResponse(
        res,
        200,
        true,
        "Restaurants retrieved successfully",
        restaurants
      );
    } catch (error) {
      Logger.error("Error fetching restaurants:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error fetching restaurants",
        error
      );
    }
  },

  getById: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (
        !req.user?.isSuperAdmin &&
        req.user?.restaurant?.toString() !== req.params.id
      ) {
        return formatResponse(res, 403, false, "Access denied");
      }

      const restaurant = await RestaurantModel.findById(req.params.id);
      if (!restaurant) {
        return formatResponse(res, 404, false, "Restaurant not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Restaurant retrieved successfully",
        restaurant
      );
    } catch (error) {
      Logger.error("Error fetching restaurant:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error fetching restaurant",
        error
      );
    }
  },

  getMyRestaurant: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const restaurant = await RestaurantModel.findById(req.user?.restaurant);
      if (!restaurant) {
        return formatResponse(res, 404, false, "Restaurant not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Restaurant retrieved successfully",
        restaurant
      );
    } catch (error) {
      Logger.error("Error fetching restaurant:", error);
      return formatResponse(res, 500, false, "Error fetching restaurant");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!validateSuperAdmin(req, res)) return;

      const data = await RestaurantUpdateSchema.parseAsync(req.body);
      const existingRestaurant = await RestaurantModel.findById(req.params.id);
      if (!existingRestaurant) {
        return formatResponse(res, 404, false, "Restaurant not found");
      }

      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
      const logoResult = await handleRestaurantLogo(
        files,
        data.name || existingRestaurant.name,
      );

      const updateData = {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.subStart && { subStart: new Date(data.subStart) }),
        ...(data.subEnd && { subEnd: new Date(data.subEnd) }),
        ...(logoResult.success && { logo: logoResult.url }),
      };

      if (data.name) {
        const duplicateRestaurant = await RestaurantModel.findOne({
          name: data.name,
          _id: { $ne: req.params.id },
        });

        if (duplicateRestaurant) {
          return formatResponse(
            res,
            400,
            false,
            "Restaurant with this name already exists"
          );
        }
      }

      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      return formatResponse(
        res,
        200,
        true,
        "Restaurant updated successfully",
        updatedRestaurant
      );
    } catch (error) {
      Logger.error("Restaurant update error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error updating restaurant",
        error
      );
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!validateSuperAdmin(req, res)) return;

      const restaurantToDelete = await RestaurantModel.findById(req.params.id);
      if (!restaurantToDelete) {
        return formatResponse(res, 404, false, "Restaurant not found");
      }
      //first delete cloudinary image
      if (restaurantToDelete.logo) {
        await cloudinary.uploader.destroy(restaurantToDelete.logo);
      }
      await RestaurantModel.findByIdAndDelete(req.params.id);
      return formatResponse(res, 200, true, "Restaurant deleted successfully");
    } catch (error) {
      Logger.error("Restaurant deletion error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error deleting restaurant",
        error
      );
    }
  },
};

export default RestaurantController;
