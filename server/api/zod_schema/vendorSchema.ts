import { z } from "zod";
import mongoose from "mongoose";

// Helper function to validate ObjectId strings
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// Bank Details Schema
const bankDetailsSchema = z.object({
  bankName: z.string().min(1, "Bank name is required").trim(),
  branch: z.string().min(1, "Branch name is required").trim(),
  accountName: z.string().min(1, "Account name is required").trim(),
  accountNumber: z.string().min(1, "Account number is required").trim(),
});

// Create Vendor Schema
export const createVendorSchema = z
  .object({
    email: z.string().email(),
    businessType: z.enum(["individual", "company"]),
    name: z.string().min(1, "Name is required").trim(),
    province: z.string().min(1, "Province is required").trim(),
    district: z.string().min(1, "District is required").trim(),
    address: z.string().min(1, "Address is required").trim(),
    companyName: z.string().trim().optional(),
    PAN: z
      .string()
      .min(1, "PAN is required")
      .trim()
      .regex(
        /^[A-Z0-9]+$/,
        "PAN must contain only uppercase letters and numbers"
      ),
    contactPerson: z.string().min(1, "Contact person is required").trim(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .trim()
      .regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
    paymentTerms: z.string().min(1, "Payment terms are required").trim(),
    bankDetails: bankDetailsSchema,
    itemsSupplied: z
      .array(z.string())
      .min(1, "At least one item must be supplied"),
    status: z.enum(["active", "inactive", "blacklisted"]).default("active"),
  })
  .refine(
    (data) => {
      // Validate that companyName is provided when businessType is company
      if (data.businessType === "company") {
        return !!data.companyName;
      }
      return true;
    },
    {
      message: "Company name is required for business type 'company'",
      path: ["companyName"],
    }
  );

// Update Vendor Schema
export const updateVendorSchema = z
  .object({
    businessType: z.enum(["individual", "company"]).optional(),
    name: z.string().min(1, "Name is required").trim().optional(),
    province: z.string().min(1, "Province is required").trim().optional(),
    district: z.string().min(1, "District is required").trim().optional(),
    address: z.string().min(1, "Address is required").trim().optional(),
    companyName: z.string().trim().optional(),
    email: z.string().email().optional(),
    PAN: z
      .string()
      .trim()
      .regex(
        /^[A-Z0-9]+$/,
        "PAN must contain only uppercase letters and numbers"
      )
      .optional(),
    contactPerson: z
      .string()
      .min(1, "Contact person is required")
      .trim()
      .optional(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s-]+$/, "Invalid phone number format")
      .optional(),
    paymentTerms: z
      .string()
      .min(1, "Payment terms are required")
      .trim()
      .optional(),
    bankDetails: bankDetailsSchema.optional(),
    itemsSupplied: z
      .array(z.string())
      .min(1, "At least one item must be supplied")
      .optional(),
    status: z.enum(["active", "inactive", "blacklisted"]).optional(),
  })
  .refine(
    (data) => {
      // Validate that companyName is provided when businessType is being updated to company
      if (data.businessType === "company") {
        return data.companyName !== undefined && data.companyName !== "";
      }
      return true;
    },
    {
      message: "Company name is required for business type 'company'",
      path: ["companyName"],
    }
  );

// Types inferred from the schemas
export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
