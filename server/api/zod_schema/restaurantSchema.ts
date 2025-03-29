import { z } from "zod";

//* Base schema without refinement
const BaseRestaurantSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Restaurant name must be at least 2 characters long" })
    .max(100, { message: "Restaurant name must be less than 100 characters" }),

  address: z.string(),
  phone:z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
  description: z.string().optional(),

  subStart: z.coerce.date({
    errorMap: () => ({ message: "Invalid subscription start date" }),
  }),

  subEnd: z.coerce.date({
    errorMap: () => ({ message: "Invalid subscription end date" }),
  }),
});

//* Create schema with date refinement
export const RestaurantCreateSchema = BaseRestaurantSchema.refine(
  (data) => data.subEnd > data.subStart,
  {
    message: "Subscription end date must be after start date",
    path: ["subEnd"],
  }
);

//* Update schema with all fields optional
export const RestaurantUpdateSchema = BaseRestaurantSchema.partial();
