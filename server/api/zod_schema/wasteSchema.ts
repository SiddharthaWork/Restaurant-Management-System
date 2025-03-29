import { z } from "zod";

// Base schema for common fields
const baseWasteSchema = z.object({
  date: z.date().optional().default(new Date()), // Defaults to current date
  sourceOfWaste: z
    .array(z.string())
    .min(1, "At least one source of waste is required"), // Array of strings (ObjectId references)
  foodMenu: z
    .array(z.string())
    .min(1, "At least one food menu item is required"), // Array of strings (ObjectId references)
  wasteType: z.string().min(1, "Waste type is required"), // Single string (ObjectId reference)
  costEstimation: z
    .number()
    .min(0, "Cost estimation must be a positive number"), // Positive number
  quantity: z.number().min(0, "Quantity must be a positive number"), // Positive number
  wasteProductType: z.string().min(1, "Waste product type is required"), // Single string (ObjectId reference)
  reason: z.string().min(1, "Reason is required"), // Non-empty string
});

// Schema for creating a waste entry
export const createWasteSchema = baseWasteSchema;

// Schema for updating a waste entry
export const updateWasteSchema = baseWasteSchema.partial();
