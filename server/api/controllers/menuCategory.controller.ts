import { Response } from "express";
import { AuthenticatedRequest } from "../types/common.types";
import { handleRestaurantAssignment } from "../utilities/restaurant";
import { formatResponse } from "../utilities/formatRes";
import { processImage } from "../utilities/multer";
import { MenuCategoryModel } from "../models/menu.model";
import Logger from "../../utils/logUtils";
import { MenuCategoryCreateSchema, MenuCategoryUpdateSchema } from "../zod_schema/menuSchema";

const MenuCategoryController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const restaurant = await handleRestaurantAssignment(req);
      if (!restaurant.success) {
        return formatResponse(
          res,
          400,
          false,
          restaurant.message || "Restaurant assignment failed"
        );
      }
      const data = await MenuCategoryCreateSchema.parseAsync(req.body);
      const { name, description, type } = data;
      const files = req.files as Express.Multer.File[] | undefined;
      // Handle photo uploads
      const photos: string[] = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const fileName = `category-${name}-${Date.now()}`;
          const result = await processImage(file, fileName);
          photos.push(result.secure_url);
        }
      }

      const newCategory = new MenuCategoryModel({
        name,
        description,
        photo: photos,
        type,
        restaurant: restaurant.id,
      });

      const savedCategory = await newCategory.save();
      return formatResponse(
        res,
        201,
        true,
        "Menu category created successfully",
        savedCategory
      );
    } catch (error) {
      Logger.error("Menu category creation error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error creating menu category",
        error
      );
    }
  },

  getAll: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const restaurant = await handleRestaurantAssignment(req);
      if (!restaurant.success) {
        return formatResponse(
          res,
          400,
          false,
          restaurant.message || "Restaurant assignment failed"
        );
      }

      const categories = await MenuCategoryModel.find({
        restaurant: restaurant.id,
      });
      return formatResponse(
        res,
        200,
        true,
        "Menu categories retrieved successfully",
        categories
      );
    } catch (error) {
      Logger.error("Menu categories fetch error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error fetching menu categories",
        error
      );
    }
  },

  getById: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const restaurant = await handleRestaurantAssignment(req);
      if (!restaurant.success) {
        return formatResponse(
          res,
          400,
          false,
          restaurant.message || "Restaurant assignment failed"
        );
      }

      const category = await MenuCategoryModel.findOne({
        _id: req.params.id,
        restaurant: restaurant.id,
      });

      if (!category) {
        return formatResponse(res, 404, false, "Menu category not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Menu category retrieved successfully",
        category
      );
    } catch (error) {
      Logger.error("Menu category fetch error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error fetching menu category",
        error
      );
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const restaurant = await handleRestaurantAssignment(req);
      if (!restaurant.success) {
        return formatResponse(
          res,
          400,
          false,
          restaurant.message || "Restaurant assignment failed"
        );
      }
      const data = await MenuCategoryUpdateSchema.parseAsync(req.body);
      const { name, description, type } = req.body;
      const files = req.files as Express.Multer.File[] | undefined;

      const updateData: any = {
        name,
        description,
        type,
      };

      if (files && files.length > 0) {
        const photos: string[] = [];
        for (const file of files) {
          const fileName = `category-${name}-${Date.now()}`;
          const result = await processImage(file, fileName);
          photos.push(result.secure_url);
        }
        updateData.photo = photos;
      }

      const updatedCategory = await MenuCategoryModel.findOneAndUpdate(
        { _id: req.params.id, restaurant: restaurant.id },
        updateData,
        { new: true }
      );

      if (!updatedCategory) {
        return formatResponse(res, 404, false, "Menu category not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Menu category updated successfully",
        updatedCategory
      );
    } catch (error) {
      Logger.error("Menu category update error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error updating menu category",
        error
      );
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const restaurant = await handleRestaurantAssignment(req);
      if (!restaurant.success) {
        return formatResponse(
          res,
          400,
          false,
          restaurant.message || "Restaurant assignment failed"
        );
      }
      const deletedCategory = await MenuCategoryModel.findOneAndDelete({
        _id: req.params.id,
        restaurant: restaurant.id,
      });

      if (!deletedCategory) {
        return formatResponse(res, 404, false, "Menu category not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Menu category deleted successfully"
      );
    } catch (error) {
      Logger.error("Menu category deletion error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error deleting menu category",
        error
      );
    }
  },
};

export default MenuCategoryController;
