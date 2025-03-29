import { model, Schema } from "mongoose";
import constants from "../constants";
import { TimeSlotSchema } from "./employee.model";
import { IFloorPlan, ITable, ITableTime } from "../types/reservation.types";


const tableTimeSchema = new Schema<ITableTime>(
  {
    time: TimeSlotSchema,
    reservation: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.RESERVATION, 
    },
    date:{
      type: Date,
      required: true
    }
  },
  { _id: false }
);
const floorPlanSchema = new Schema({
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

export const floorPlan = model<IFloorPlan>(
  constants.DB.FLOORPLAN,
  floorPlanSchema
);

const tableSchema = new Schema<ITable>({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(constants.TABLESTATUS),
    default: constants.TABLESTATUS.AVAILABLE,
    required: true,
  },
  waiter: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.USER,
    default: null,
  },
  floorPlan: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.FLOORPLAN,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  times: [
    {
      type: tableTimeSchema,
    },
  ],
});

export const Table = model<ITable>(constants.DB.TABLE, tableSchema);
