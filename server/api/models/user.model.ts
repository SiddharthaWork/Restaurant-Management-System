import mongoose, { Schema, Model } from "mongoose";

import { IUser } from "../types/user.types";
import constants from "../constants";
import { TimeSlotSchema } from "./employee.model";

// User Model
const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
    required: true,
    default:false
  },
  userRole: {
    type: String,
    required: true,
    enum: Object.values(constants.USERROLE)
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  docs: [
    {
      type: String,
    },
  ],
  profileImg: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: TimeSlotSchema,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  paidLeave: {
    type: Number,
    default: 0,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: constants.DB.RESTAURANT,
  },
  position: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: constants.DB.POSITION,
  },
  shiftType: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.EMPSHIFT,
    default: null,
  },
  empRole: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.EMPROLE,
    default: null,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.DEPARTMENT,
    default: null,
  },
});

export const User: Model<IUser> = mongoose.model<IUser>(
  constants.DB.USER,
  UserSchema
);
