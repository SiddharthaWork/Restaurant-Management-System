import { z } from "zod";
import constants from "../constants";

// MongoDB ObjectId regex
const objectIdRegex = /^[a-f\d]{24}$/i;

// Validation schemas using Zod
export const registerSchema = z.object({
  name: z.string(),
  password: z.string().min(6, "Password must be at least 8 characters long"),
  userRole: z
    .enum(Object.values(constants.USERROLE) as [string, ...string[]])
    .optional(),
  restaurant: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for shiftType",
    }),
  address: z.string(),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email format"),
  DOB: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  position: z.string().optional(),
  to: z.string(),
  from: z.string(),
  salary: z.string(),
  shiftType: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for shiftType",
    }),
  empRole: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for empRole",
    }),
  department: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for department",
    }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

//* update user schema
export const updateUserSchema = z.object({
  name: z.string().optional(),
  userRole: z
    .enum(Object.values(constants.USERROLE) as [string, ...string[]])
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long")
    .optional(),
  restaurant: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for restaurant",
    }),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format")
    .optional(),
  email: z.string().email("Invalid email format").optional(),
  DOB: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  position: z.string().optional(),
  to: z.string().optional(),
  from: z.string().optional(),
  salary: z.string().optional(),
  shiftType: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for shiftType",
    }),
  empRole: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for empRole",
    }),
  department: z
    .string()
    .optional()
    .refine((val) => !val || objectIdRegex.test(val), {
      message: "Invalid MongoDB ObjectId format for department",
    }),
});
