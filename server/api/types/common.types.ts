import { IUser } from "./user.types";
import { Request } from "express";
import { Document,  Schema, Types } from "mongoose";
import constants from "../constants";
import { z } from "zod";

export interface AuthenticatedRequest extends Request {
  user?: Partial<IUser>;
}

export interface QueryOptions {
  _id?: string;
  restaurant?: string;
}

//* BASE INTERFACE FOR SUB-MODELS
export interface Base extends Document {
  restaurant: Schema.Types.ObjectId;
  name: string;
  isActive: boolean;
}

export const BaseSchema = new Schema<Base>({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Helper function to validate ObjectId
const isValidObjectId = (value: string) => Types.ObjectId.isValid(value);

// Base schema for create operations
export const baseCreateSchema = z.object({
  restaurant: z.string().refine(isValidObjectId, "Invalid restaurant ID").optional(),
  name: z.string().min(1, "Name is required").trim(),
  isActive: z.boolean().default(true),
});

// Base schema for update operations - all fields optional
export const baseUpdateSchema = z.object({
  restaurant: z
    .string()
    .refine(isValidObjectId, "Invalid restaurant ID")
    .optional(),
  name: z.string().min(1, "Name is required").trim().optional(),
  isActive: z.boolean().optional(),
});

// Base response schema including common fields
export const baseResponseSchema = baseCreateSchema.extend({
  _id: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

// Request schemas for API validation
export const baseCreateRequestSchema = z.object({
  body: baseCreateSchema,
});

export const baseUpdateRequestSchema = z.object({
  params: z.object({
    id: z.string().refine(isValidObjectId, "Invalid ID"),
  }),
  body: baseUpdateSchema,
});
