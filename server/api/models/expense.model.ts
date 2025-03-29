import { Base, BaseSchema } from "./../types/common.types";
import { model, Schema } from "mongoose";
import constants from "../constants";

export interface IExpenseCategory extends Base {}

export const ExpenseCategory = model<IExpenseCategory>(
  constants.DB.ExpenseCategory,
  BaseSchema
);

export interface IPayementMode extends Base {}

export const payementMode = model<IPayementMode>(
  constants.DB.PAYMENTMODE,
  BaseSchema
);

export interface IExpense {
  restaurant: Schema.Types.ObjectId;
  expenseCategory: Schema.Types.ObjectId;
  date: Date;
  description: string;
  amount: number;
  paymentMode: Schema.Types.ObjectId;
  note: string;
  purchaseId: Schema.Types.ObjectId;
}

const ExpenseSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  expenseCategory: {
    type: Schema.Types.ObjectId,
    ref: "ExpenseCategory",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: Schema.Types.ObjectId,
    ref: "PaymentMode",
    required: true,
  },
  note: {
    type: String,
    trim: true,
  },
  purchaseId: {
    type: Schema.Types.ObjectId,
    ref: "Purchase",
  },
});

export const Expense = model<IExpense>(constants.DB.Expense, ExpenseSchema);
