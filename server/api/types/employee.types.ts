import mongoose,{Document} from "mongoose";
import { Base } from "./common.types";
import { Restaurant } from "./restaurant.types";
import { IUser } from "./user.types";
import { IPermission } from "./permission.types";

//* Employee Attendance
export interface IEmpAttendance extends Document {
  restaurant: mongoose.Types.ObjectId | Partial<Restaurant>;
  user: mongoose.Types.ObjectId | Partial<IUser>;
  checkIn: string;
  checkOut: string;
  status: string;
}

//* Employee Shift
export interface IEmpShiftType extends Base {
  startTime: Date;
  endTime: Date;
  brkeTime: Date;
}

//* Employee Department
export interface IEmpDepartment extends Base {}
//* Employee Position
export interface IEmpPosition extends Base {}
//* Employee Role
export interface IEmpRole extends Base {
  permissions: IPermission[];
}
