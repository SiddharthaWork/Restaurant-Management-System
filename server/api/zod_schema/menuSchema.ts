import { z } from "zod";
import constants from "../constants";

// Base schema with common fields
const itemBaseSchema = {
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  price: z.string().transform((value) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      throw new Error("Price must be a number");
    }
    if (num < 0) {
      throw new Error("Price must be positive");
    }
    return num;
  }),
  category: z.string().regex(constants.objectIdRegex, "Invalid category ID"),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),
  toppings: z
    .array(z.string())
    .max(20, "Maximum 20 toppings allowed")
    .optional(),
  size: z
    .array(
      z.object({
        size: z.string().min(1, "Size must not be empty"),
        price: z.string().transform((value) => {
          const num = parseFloat(value.toString());
          if (isNaN(num)) {
            throw new Error("Price must be a number");
          }
          if (num < 0) {
            throw new Error("Price must be positive");
          }
          return num;
        }),
      })
    )
    .min(1, "At least one size and price is required")
    .optional(),
};

// Create schema - requires all fields
export const MenuItemCreateSchema = z.object({
  ...itemBaseSchema,
});

// Update schema - all fields are optional
export const MenuItemUpdateSchema = z.object({
  ...Object.entries(itemBaseSchema).reduce(
    (acc, [key, schema]) => ({
      ...acc,
      [key]: schema.optional(),
    }),
    {}
  ),
});

// Base schema with common fields
const categoryBaseSchema = {
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  type: z.enum(["food", "beverage"], {
    errorMap: () => ({ message: 'Must be either "food" or "beverage"' }),
  }),
};

// Create schema - requires all fields
export const MenuCategoryCreateSchema = z.object({
  ...categoryBaseSchema,
});

// Update schema - all fields are optional
export const MenuCategoryUpdateSchema = z.object({
  ...Object.entries(categoryBaseSchema).reduce(
    (acc, [key, schema]) => ({
      ...acc,
      [key]: schema.optional(),
    }),
    {}
  ),
});
