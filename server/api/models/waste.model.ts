import { model, Schema } from "mongoose";
import { Base, BaseSchema } from "../types/common.types";
import constants from "../constants";

export const wasteSourceModel = model<Base>(constants.DB.WASTESOURCE,BaseSchema);
export const wasteTypeModel = model<Base>(
  constants.DB.WASTETYPE,
  BaseSchema
);
export const wasteProductTypeModel = model<Base>(
  constants.DB.WASTEPRODUCTTYPE,
  BaseSchema
);

const wasteSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  sourceOfWaste: {
    type: [Schema.Types.ObjectId],
    ref: constants.DB.WASTESOURCE,
    required: true,
  },
  foodMenu: {
    type: [Schema.Types.ObjectId],
    ref: constants.DB.MENU,
    required: true,
  },
  wasteType: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.WASTETYPE,
    required: true,
  },
  costEstimation: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  wasteProductType: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.WASTEPRODUCTTYPE,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

// Create and export the Waste model
export const WasteModel = model("Waste", wasteSchema);
