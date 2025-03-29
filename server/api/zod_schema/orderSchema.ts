import { z } from "zod";
import mongoose from "mongoose";
import constants from "../constants";

// Helper function to validate ObjectId strings
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// Customer Details Schema
const customerDetailsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  email: z.string().email().optional(),
});

// Menu Item Schema
export const menuItemSchema = z.object({
  item: z.string().refine(isValidObjectId, "Invalid menu item ID"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  note: z.string().optional(),
});

// Create Order Schema
export const createOrderSchema = z
  .object({
    orderType: z.enum(["dineIn", "takeaway", "delivery"] as const),
    menuItems: z
      .array(menuItemSchema)
      .min(1, "At least one menu item is required"),
    table: z
      .array(z.string().refine(isValidObjectId, "Invalid table ID"))
      .optional(),
    customerDetails: customerDetailsSchema,
    waiter: z.string().refine(isValidObjectId, "Invalid waiter ID"),
    status: z
      .enum(["server", "ready", "inprogress", "cancel", "complaint"] as const)
      .default("inprogress"),
    discount: z.number().min(0).max(100).default(0),
  })
  .refine(
    (data) => {
      // Validate that table is provided for dine-in orders
      if (data.orderType === "dineIn") {
        return data.table && data.table.length > 0;
      }
      return true;
    },
    {
      message: "Table is required for dine-in orders",
      path: ["table"],
    }
  );

// Update Order Schema
export const updateOrderSchema = z
  .object({
    orderType: z.enum(["dineIn", "takeaway", "delivery"] as const).optional(),
    menuItems: z
      .array(menuItemSchema)
      .min(1, "At least one menu item is required")
      .optional(),
    table: z
      .array(z.string().refine(isValidObjectId, "Invalid table ID"))
      .optional(),
    customerDetails: customerDetailsSchema.optional(),
    waiter: z.string().refine(isValidObjectId, "Invalid waiter ID").optional(),
    status: z
      .enum(["server", "ready", "inprogress", "cancel", "complaint"] as const)
      .optional(),
    discount: z.number().min(0).max(100).optional(),
  })
  .refine(
    (data) => {
      // Validate that table is provided for dine-in orders if orderType is being updated
      if (data.orderType === constants.ORDERTYPE.DINEIN) {
        return data.table && data.table.length > 0;
      }
      return true;
    },
    {
      message: "Table is required for dine-in orders",
      path: ["table"],
    }
  );
