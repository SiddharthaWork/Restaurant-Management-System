import mongoose, { Model, Schema } from "mongoose";
import { IEmpAttendance } from "../types/employee.types";
import constants from "../constants";

// Attendance Schema
const AttendanceSchema: Schema = new Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.DB.RESTAURANT, // Reference to the Restaurant model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.DB.USER, // Reference to the User model
      required: true,
    },
    checkIn: {
      type: String,
      default: null, // Allow null for Absent/Leave
    },
    checkOut: {
      type: String,
      default: null, // Allow null for ongoing shifts
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(constants.ATTENDANCESTATUS),
      default: "Absent",
    },
  },
  {
    timestamps: true,
  }
);

export const Attendance: Model<IEmpAttendance> = mongoose.model<IEmpAttendance>(
  constants.DB.ATTENDANCE,
  AttendanceSchema
);
