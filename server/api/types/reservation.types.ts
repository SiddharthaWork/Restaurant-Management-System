import { Schema,Document } from "mongoose";
import constants from "../constants";
import { TimeSlotSchema } from "../models/employee.model";
import { Base } from "./common.types";
import { TimeSlot } from "./user.types";


export interface ITableTime extends Document {
  time: { from: string; to: string };
  reservation: Schema.Types.ObjectId;
  date: Date;
}

export interface IFloorPlan extends Base {}

export interface ITable extends Document {
  restaurant: Schema.Types.ObjectId;
  name: string;
  capacity: number;
  status: string;
  waiter: Schema.Types.ObjectId | null;
  floorPlan: Schema.Types.ObjectId | null;
  date: Date;
  times: [ITableTime];
  createdAt?: Date;
}
export interface IReservationType extends Base {}

export interface IReservation extends Document {
  restaurant: Schema.Types.ObjectId;
  reservationType: Schema.Types.ObjectId;
  pax: number;
  table: [Schema.Types.ObjectId] | [Partial<ITable>];
  date: Date;
  time: TimeSlot;
  client: {
    name: string;
    phone: string;
    email: string;      
    gender: "male" | "female" | "other";
  };
  deposit: boolean;
  additional: string;
  createdAt: Date;
  updatedAt: Date;
}
