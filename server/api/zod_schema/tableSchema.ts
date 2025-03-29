import { z } from "zod";
import constants from "../constants";

export const floorPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean().default(true),
});

export const updateFloorPlanSchema = floorPlanSchema.partial();

export const tableSchema = z.array(
  z.object({
    restaurant: z.string().regex(constants.objectIdRegex).optional(),
    name: z.string().min(1, "Name is required"),
    capacity: z.number().int().min(1, "Capacity must be at least 1"),
    waiter: z
      .string()
      .regex(constants.objectIdRegex, "Invalid ObjectId")
      .optional(),
    floorPlan: z
      .string()
      .regex(constants.objectIdRegex, "Invalid ObjectId")
      .optional(),
    date: z.coerce.date(),
    time: z
      .object({
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .optional(),
  })
);

export const updateTableSchema = z.object({
  restaurant: z.string().regex(constants.objectIdRegex).optional(),
  name: z.string().min(1, "Name is required"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  waiter: z
    .string()
    .regex(constants.objectIdRegex, "Invalid ObjectId")
    .optional(),
  floorPlan: z
    .string()
    .regex(constants.objectIdRegex, "Invalid ObjectId")
    .optional(),
  date: z.coerce.date(),
  time: z
    .object({
      from: z.string().optional(),
      to: z.string().optional(),
    })
    .optional(),
});
