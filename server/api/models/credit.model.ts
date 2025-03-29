import mongoose, { Model, Schema } from "mongoose";
import {
  ICredit,
  ICreditRepaymentFrequency,
  ICreditRepaymentMethod,
} from "../types/credit.types";
import constants from "../constants";

//* CreditRepaymentMethod Model
const CreditRepaymentMethodSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true,
  },
});

export const CreditRepaymentMethod: Model<ICreditRepaymentMethod> =
  mongoose.model<ICreditRepaymentMethod>(
    constants.DB.CREDITREPAYMENTMETHOD,
    CreditRepaymentMethodSchema
  );

//* CreditRepaymentFrequency Model
const CreditRepaymentFrequencySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export const CreditRepaymentFrequency: Model<ICreditRepaymentFrequency> =
  mongoose.model<ICreditRepaymentFrequency>(
    constants.DB.CREDITREPAYMENTFREQUENCY,
    CreditRepaymentFrequencySchema
  );

//* Create a schema for the credit
const CreditSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  creditAmount: { type: Number, required: true },
  reason: { type: String, required: true },
  date: { type: Date, required: true },
  creditRepaymentMethod: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.CREDITREPAYMENTMETHOD,
    default: null,
  },
  creditRepaymentFrequency: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.CREDITREPAYMENTFREQUENCY,
    default: null,
  },
  repaymentStartDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: [
      constants.CREDITSTATUS.PAID,
      constants.CREDITSTATUS.UNPAID,
      constants.CREDITSTATUS.EXPIRED,
    ],
    default: constants.CREDITSTATUS.UNPAID,
  },
});

// Create the model
const Credit = mongoose.model<ICredit>(constants.DB.CREDIT, CreditSchema);

export default Credit;
