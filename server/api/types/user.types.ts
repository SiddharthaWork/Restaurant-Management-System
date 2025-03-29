import { Document, Types } from "mongoose";
import {
  IEmpDepartment,
  IEmpPosition,
  IEmpRole,
  IEmpShiftType,
} from "./employee.types";
import { Restaurant } from "./restaurant.types";

export interface TimeSlot {
  _id?: Types.ObjectId;
  from: string;
  to: string;
}

export interface IUser extends Document {
  name: string;
  userRole: string;
  isSuperAdmin: boolean;
  restaurant: Types.ObjectId | Restaurant;
  password: string;
  address: string;
  phone: string;
  email: string;
  DOB: Date;
  gender: string;
  docs: string[];
  profileImg?: string;
  joinDate: Date;
  position: Types.ObjectId | IEmpPosition;
  time: Types.ObjectId | TimeSlot;
  salary: number;
  paidLeave: number;
  shiftType: Types.ObjectId | IEmpShiftType;
  empRole: Types.ObjectId | IEmpRole;
  department: Types.ObjectId | IEmpDepartment;
}
