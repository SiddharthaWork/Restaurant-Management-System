import { z } from "zod";
import { Types } from "mongoose";
import { baseCreateSchema, baseUpdateSchema } from "../types/common.types";

// Helper function to validate ObjectId
const isValidObjectId = (value: string) => Types.ObjectId.isValid(value);

// Create schema
export const createItemSchema = baseCreateSchema.extend({
  name: z.string().min(1, "Name is required").max(100).trim(),
  isActive: z.boolean().default(true),
  type: z.string().refine(isValidObjectId, "Invalid item type ID"),
  threshold: z.number().min(0, "Threshold must be non-negative"),
  category: z.string().refine(isValidObjectId, "Invalid category ID"),
});

// Update schema - all fields optional
export const updateItemSchema = baseUpdateSchema.extend({
  name: z.string().min(1, "Name is required").max(100).trim().optional(),
  isActive: z.boolean().optional(),
  type: z.string().refine(isValidObjectId, "Invalid item type ID").optional(),
  threshold: z.number().min(0, "Threshold must be non-negative").optional(),
  category: z
    .string()
    .refine(isValidObjectId, "Invalid category ID")
    .optional(),
});
