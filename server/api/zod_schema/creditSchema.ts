import { z } from "zod";
import constants from "../constants";

// Zod schema for credit validation
export const creditSchema = z.object({
  user: z.string().regex(constants.objectIdRegex, "Invalid User ID format"),
  creditAmount: z.number().positive(),
  date: z.string().transform((str) => new Date(str)),
  reason: z.string().min(1),
  repaymentStartDate: z.string().transform((str) => new Date(str)),
  creditRepaymentMethod: z
    .string()
    .regex(constants.objectIdRegex, "Invalid repayment method ID format"),
  creditRepaymentFrequency: z
    .string()
    .regex(constants.objectIdRegex, "Invalid repayment frequency ID format"),
  restaurant: z.string().optional(), // Optional because it might come from req.user
});

export const updateCreditSchema = z.object({
  creditAmount: z.number().positive().optional(),
  reason: z.string().min(1).optional(),
  status: z
    .enum([
      constants.CREDITSTATUS.PAID,
      constants.CREDITSTATUS.UNPAID,
      constants.CREDITSTATUS.EXPIRED,
    ])
    .optional(),
  repaymentStartDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  creditRepaymentMethod: z.string().regex(constants.objectIdRegex).optional(),
  creditRepaymentFrequency: z
    .string()
    .regex(constants.objectIdRegex)
    .optional(),
});
