import { Document, Types } from "mongoose";
import { IUser } from "./user.types";

export type Module = {
  name: string;
  permissions: number;
  subModule: ISubmodule[];
};

export type ISubmodule = {
  name: string;
  permissions: number;
};
export interface IMap {
  [key: string]: string[];
}
export interface IPermission extends Document {
  restaurant: Partial<IPermission> | Types.ObjectId;
  user: Partial<IUser> | Types.ObjectId;
  module: Module[];
  subModule: ISubmodule[];
  permissions: number;
}
