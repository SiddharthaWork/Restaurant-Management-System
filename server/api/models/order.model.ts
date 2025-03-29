import mongoose from "mongoose";
import constants from "../constants";

// Define the TypeScript interface
export interface IMenuItems {
  item: string;
  quantity: number;
  note?: string;
}
export interface IOrder {
  restaurant: mongoose.Types.ObjectId;
  orderType: "dineIn" | "takeaway" | "delivery";
  menuItems: IMenuItems[];
  table?: mongoose.Types.ObjectId;
  customerDetails: typeof CustomerDetailsSchema;
  waiter: mongoose.Types.ObjectId;
  date: Date;
  status: "server" | "ready" | "inprogress" | "cancel" | "complaint";
  discount: number;
}

//* Menu item sub-schema
const MenuItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.DB.MENU,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    note: {
      type: String,
    },
  },
  { _id: false }
);

//* Customer details
const CustomerDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { _id: false }
);

// Define the schema
const OrderSchema = new mongoose.Schema<IOrder>({
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true
  },
  orderType: {
    type: String,
    enum: Object.values(constants.ORDERTYPE),
    required: true,
  },
  menuItems: [MenuItemSchema],
  table: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.DB.TABLE,
      required: function () {
        return this.orderType === constants.ORDERTYPE.DINEIN;
      },
    },
  ],
  customerDetails: {
    type: CustomerDetailsSchema,
    required: true,
  },
  waiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: constants.DB.USER,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: Object.values(constants.ORDERSTATUS),
    required: true,
    default: "inprogress",
  },
  discount: {
    type: Number,
    default: 0,
  },
});

// Create the model
export const Order = mongoose.model(constants.DB.ORDER, OrderSchema);
