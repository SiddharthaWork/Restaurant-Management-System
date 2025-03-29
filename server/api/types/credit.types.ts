import { Document, Types } from "mongoose";

import { Base } from "./common.types";
import { IUser } from "./user.types";
import constants from "../constants";

export type CreditStatus = typeof constants.CREDITSTATUS[keyof typeof constants.CREDITSTATUS];
//* Credit Repayment
export interface ICreditRepaymentMethod extends Base {}

//* Credit Repayment
export interface ICreditRepaymentFrequency extends Base {}

//* Credit
export interface ICredit extends Document {
  user: Types.ObjectId[] | Partial<IUser>;
  restaurant: string;
  creditAmount: number;
  reason: string;
  date: Date;
  creditRepaymentMethod: Types.ObjectId[] | Partial<ICreditRepaymentMethod>;
  creditRepaymentFreq: Types.ObjectId[] | Partial<ICreditRepaymentFrequency>;
  repaymentStartDate: Date;
  status: CreditStatus;
}
