import { AuthenticatedRequest } from "../types/common.types";
import { Response } from "express";
import { formatResponse } from "../utilities/formatRes";
import { Order } from "../models/order.model";
import { updateOrderSchema } from "../zod_schema/orderSchema";

export const addItemToOrder = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { menuItems } = updateOrderSchema.parse(req.body);

    const order = await Order.findById(id);
    if (!order) {
      return formatResponse(res, 404, false, "Order not found");
    }

    if (!menuItems || menuItems.length === 0) {
      return formatResponse(res, 400, false, "No menu items provided");
    }

    const updatedMenuItems = order.menuItems.slice(); // Create a copy of the existing menu items

    menuItems.forEach((newItem) => {
      const existingItemIndex = updatedMenuItems.findIndex(
        (item) => item.item.toString() === newItem.item.toString()
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        updatedMenuItems[existingItemIndex].quantity += newItem.quantity;
        if (newItem.note) {
          updatedMenuItems[existingItemIndex].note = newItem.note;
        }
      } else {
        // Add new item
        updatedMenuItems.push({
          item: newItem.item,
          quantity: newItem.quantity,
          note: newItem.note,
        });
      }
    });

    order.menuItems = updatedMenuItems;
    await order.save();

    return formatResponse(res, 200, true, "Items added to order successfully");
  } catch (error) {
    console.error("Error adding item to order:", error);
    return formatResponse(res, 500, false, "Error adding item to order", error);
  }
};
export const removeMenuItems = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { menuItems } = updateOrderSchema.parse(req.body);

    const order = await Order.findById(id);
    if (!order) {
      return formatResponse(res, 404, false, "Order not found");
    }

    if (!menuItems || menuItems.length === 0) {
      return formatResponse(
        res,
        400,
        false,
        "No menu items provided for removal"
      );
    }

    const updatedMenuItems = order.menuItems.filter((existingItem) => {
      const itemToRemove = menuItems.find(
        (item) => item.item.toString() === existingItem.item.toString()
      );

      if (!itemToRemove) {
        return true; // Keep items that are not in the removal list
      }

      if (existingItem.quantity > itemToRemove.quantity) {
        existingItem.quantity -= itemToRemove.quantity;
        return true; // Keep the item with reduced quantity
      }

      return false; // Remove the item completely
    });


    order.menuItems = updatedMenuItems;
    await order.save();

    return formatResponse(
      res,
      200,
      true,
      "Items removed from order successfully"
    );
  } catch (error) {
    console.error("Error removing items from order:", error);
    return formatResponse(
      res,
      500,
      false,
      "Error removing items from order",
      error
    );
  }
};

