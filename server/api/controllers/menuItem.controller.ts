import { Response } from "express";

import Logger from "../../utils/logUtils";
import { handleRestaurantAssignment } from "../utilities/restaurant";
import { formatResponse } from "../utilities/formatRes";
import { MenuCategoryModel, MenuItemModel } from "../models/menu.model";
import { processImage } from "../utilities/multer";
import { AuthenticatedRequest } from "../types/common.types";
import {
  MenuItemCreateSchema,
  MenuItemUpdateSchema,
} from "../zod_schema/menuSchema";

const MenuItemController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    try {
      console.log(req.body);
      const restaurant = await handleRestaurantAssignment(req);
      if (!restaurant.success) {
        return formatResponse(
          res,
          400,
          false,
          restaurant.message || "Restaurant assignment failed"
        );
      }
      const data = await MenuItemCreateSchema.parseAsync(req.body);
      // Verify category exists and belongs to restaurant
      const category = await MenuCategoryModel.findOne({
        _id: req.body.category,
        restaurant: restaurant.id,
      });

      if (!category) {
        return formatResponse(res, 400, false, "Invalid category");
      }

      const { name, description, price, size, tags, toppings } = data;
      //check if same named item exists
      const existingItem = await MenuItemModel.findOne({
        name,
        category: category._id,
        restaurant: restaurant.id,
      });

      if (existingItem) {
        return formatResponse(
          res,
          400,
          false,
          "Item with same name already exists"
        );
      }
      const formattedSize = Array.isArray(size)
        ? size.map((s) => ({
            size: s.size,
            price: s.price,
          }))
        : [];

      const files = req.files as Express.Multer.File[] | undefined;
      // Handle photo uploads
      const photos: string[] = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const fileName = `item-${name}-${Date.now()}`;
          const result = await processImage(file, fileName);
          photos.push(result.secure_url);
        }
      }
      const newItem = new MenuItemModel({
        name,
        description,
        photos,
        price,
        size: formattedSize,
        tags,
        toppings,
        category: category._id,
        restaurant: restaurant.id,
      });

      const savedItem = await newItem.save();
      return formatResponse(
        res,
        201,
        true,
        "Menu item created successfully",
        savedItem
      );
    } catch (error) {
      Logger.error("Menu item creation error:", error);
      return formatResponse(res, 500, false, "Error creating menu item", error);
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

    // Get category ID from query parameters
    const categoryId = req.query.categoryId;

    // Build the query object
    const query: any = {
      restaurant: restaurant.id,
    };
    
    // Add category filter if categoryId is provided
    if (categoryId) {
      query.category = categoryId;
    }

    const items = await MenuItemModel.find(query).populate("category");
    
    return formatResponse(
      res,
      200,
      true,
      "Menu items retrieved successfully",
      items
    );
  } catch (error) {
    Logger.error("Menu items fetch error:", error);
    return formatResponse(
      res,
      500,
      false,
      "Error fetching menu items",
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

      const item = await MenuItemModel.findOne({
        _id: req.params.id,
        restaurant: restaurant.id,
      }).populate("category");

      if (!item) {
        return formatResponse(res, 404, false, "Menu item not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Menu item retrieved successfully",
        item
      );
    } catch (error) {
      Logger.error("Menu item fetch error:", error);
      return formatResponse(res, 500, false, "Error fetching menu item", error);
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

      if (req.body.category) {
        const category = await MenuCategoryModel.findOne({
          _id: req.body.category,
          restaurant: restaurant.id,
        });

        if (!category) {
          return formatResponse(res, 400, false, "Invalid category");
        }
      }
      await MenuItemUpdateSchema.parseAsync(req.body);
      const { name, description, price, size, tags, toppings } = req.body;
      const files = req.files as Express.Multer.File[] | undefined;

      const updateData: any = {
        name,
        description,
        price,
        tags,
        toppings,
      };

      if (size) {
        updateData.size = new Map(Object.entries(size));
      }

      if (files && files.length > 0) {
        const photos: string[] = [];
        for (const file of files) {
          const fileName = `item-${name}-${Date.now()}`;
          const result = await processImage(file, fileName);
          photos.push(result.secure_url);
        }
        updateData.photos = photos;
      }

      const updatedItem = await MenuItemModel.findOneAndUpdate(
        { _id: req.params.id, restaurant: restaurant.id },
        updateData,
        { new: true }
      ).populate("category");

      if (!updatedItem) {
        return formatResponse(res, 404, false, "Menu item not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Menu item updated successfully",
        updatedItem
      );
    } catch (error) {
      Logger.error("Menu item update error:", error);
      return formatResponse(res, 500, false, "Error updating menu item", error);
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

      const deletedItem = await MenuItemModel.findOneAndDelete({
        _id: req.params.id,
        restaurant: restaurant.id,
      });

      if (!deletedItem) {
        return formatResponse(res, 404, false, "Menu item not found");
      }

      return formatResponse(res, 200, true, "Menu item deleted successfully");
    } catch (error) {
      Logger.error("Menu item deletion error:", error);
      return formatResponse(res, 500, false, "Error deleting menu item", error);
    }
  },
};

export default MenuItemController;
