import { z } from "zod";
import { Table } from "../models/table.model";
import constants from "../constants";

// Create a schema for the client information
const ClientSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address").toLowerCase().optional(),
  gender: z.enum(["male", "female", "other"]),
});

// Main reservation schema
export const reservationSchema = z.object({
  restaurant: z
    .string()
    .regex(constants.objectIdRegex, "Invalid ObjectId")
    .optional(),
  reservationType: z
    .string()
    .regex(constants.objectIdRegex, "Reservation type is required/invalid."),

  pax: z
    .number()
    .int()
    .positive("Number of guests must be positive")
    .min(1, "Minimum 1 guest required"),

  table: z
    .array(z.string().regex(constants.objectIdRegex, "Invalid ObjectId"))
    .min(1, "Table is required"),

  date: z
    .string()
    .datetime({ message: "Invalid date format" })
    .transform((value) => {
      const normalizedDate = new Date(value);
      return normalizedDate.setHours(0, 0, 0, 0);
    }),

  time: z.object({
    from: z
      .string()
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
    to: z
      .string()
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  }),

  client: ClientSchema,

  deposit: z.boolean().default(false),

  additional: z
    .string()
    .max(500, "Additional notes must not exceed 500 characters")
    .optional()
    .default(""),
});
