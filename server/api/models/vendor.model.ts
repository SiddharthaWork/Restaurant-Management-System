import { model, Schema, Types } from "mongoose";
import constants from "../constants";
import { Base } from "../types/common.types";

// TypeScript interface
export interface IVendor extends Base {
  businessType: Types.ObjectId;
  province: string;
  email: string;
  district: string;
  address: string;
  companyName?: string;
  PAN: string;
  contactPerson: string;
  phone: string;
  paymentTerms: string;
  bankDetails: {
    bankName: string;
    branch: string;
    accountName: string;
    accountNumber: string;
  };
  itemsSupplied: Types.ObjectId[];
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBusinessType extends Base {}

const BusinessSchema = new Schema<Base>({
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
export const BusinessTypeModel = model<IBusinessType>(
  constants.DB.BUSINESSTYPE,
  BusinessSchema
);
// Bank details sub-schema
const BankDetailsSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Main vendor schema
const VendorSchema = new Schema<IVendor>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.RESTAURANT,
      required: true,
    },
    businessType: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.BUSINESSTYPE,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    PAN: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    paymentTerms: {
      type: String,
      required: true,
      trim: true,
    },
    bankDetails: {
      type: BankDetailsSchema,
      required: true,
    },
    itemsSupplied: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: Object.values(constants.VENDORSTATUS),
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Vendor = model<IVendor>(constants.DB.VENDOR, VendorSchema);

export default Vendor;
