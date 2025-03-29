import mongoose, { Schema, Document } from "mongoose";
import constants from "../constants";

// TypeScript interface
export interface IStock extends Document {
  restaurant: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
  billNo: string;
  vendor: string;
  costPerUnit: number;
  expiryDate: Date;
  purchaseDate: Date;
  stock: number;
}

// Mongoose schema
const stockSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.RESTAURANT,
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: constants.DB.ITEM,
        required: true,
      },
    ],
    billNo: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.VENDOR,
      required: true,
      trim: true,
    },
    costPerUnit: {
      type: Number,
      required: true,
      min: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
stockSchema.index({ restaurant: 1, billNo: 1 }, { unique: true });
stockSchema.index({ items: 1 });
stockSchema.index({ expiryDate: 1 });
stockSchema.index({ purchaseDate: 1 });
stockSchema.index({ vendor: 1 });


// Mongoose model
const Stock = mongoose.model<IStock>(constants.DB.STOCK,stockSchema);

export default Stock;
