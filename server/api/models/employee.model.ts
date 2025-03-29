import mongoose, { Model, Schema } from "mongoose";
import {
  IEmpDepartment,
  IEmpPosition,
  IEmpRole,
  IEmpShiftType,
} from "../types/employee.types";
import constants from "../constants";

//* TimeSlot Schema (embedded)
export const TimeSlotSchema: Schema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  {
    _id: false,
  }
);
//* EmpShiftType Model
const EmpShiftTypeSchema: Schema = new Schema({
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
  time: TimeSlotSchema,
});
export const EmpShiftType: Model<IEmpShiftType> = mongoose.model<IEmpShiftType>(
  constants.DB.EMPSHIFT,
  EmpShiftTypeSchema
);

//* Department Model
const DepartmentSchema: Schema = new Schema({
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

export const Department: Model<IEmpDepartment> = mongoose.model<IEmpDepartment>(
  constants.DB.DEPARTMENT,
  DepartmentSchema
);

//* Position Model
const PositionSchema: Schema = new Schema({
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

export const Position: Model<IEmpPosition> = mongoose.model<IEmpPosition>(
  constants.DB.POSITION,
  PositionSchema
);

//* EmpRole Model
const EmpRoleSchema: Schema = new Schema({
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

export const EmpRole: Model<IEmpRole> = mongoose.model<IEmpRole>(
  constants.DB.EMPROLE,
  EmpRoleSchema
);
