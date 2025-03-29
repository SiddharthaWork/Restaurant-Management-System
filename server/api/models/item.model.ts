import { Schema, Document, model } from "mongoose";
import constants from "../constants";
import { Base, BaseSchema } from "../types/common.types";

// TypeScript interface
export interface IItem extends Base {
  type: string;
  threshold: number;
  category: string;
}

export interface IItemCategory extends Base {}
export interface IItemType extends Base {}

export const ItemCategoryModel = model<IItemCategory>(
  constants.DB.ITEMCATEGORY,
  BaseSchema
);
export const ItemTypeModel = model<IItemType>(
  constants.DB.ITEMCATEGORY,
  BaseSchema
);
// Mongoose schema
const itemSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.RESTAURANT,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.ITEMTYPE,
      required: true,
      trim: true,
    },
    threshold: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.ITEMCATEGORY,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

itemSchema.index({ restaurant: 1, name: 1 }, { unique: true });
itemSchema.index({ category: 1 });
itemSchema.index({ status: 1 });

// Mongoose model
const Item = model<IItem>(constants.DB.ITEM, itemSchema);

export default Item;
