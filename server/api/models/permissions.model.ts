import { IUser } from "./../types/user.types";
import mongoose, { Schema } from "mongoose";
import constants from "../constants";
import { IPermission } from "../types/permission.types";

const { PERMISSION_LEVELS } = constants;

const SubmoduleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permissions: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value >= 0 && value <= 15, // 1111 in binary
        message: "Invalid permission value",
      },
      default: PERMISSION_LEVELS.NONE,
    },
  },
  { id: false }
);

const ModuleSchema = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(constants.PERMISSIONMODULES),
      required: true,
    },
    permissions: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value >= 0 && value <= 15,
        message: "Invalid permission value",
      },
      default: PERMISSION_LEVELS.NONE,
    },
    subModule: [SubmoduleSchema],
  },
  { id: false }
);

const PermissionSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true,
  },
  module: [ModuleSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.USER,
    required: true,
  },
});

export const Permission = mongoose.model<IPermission>(
  constants.DB.PERMISSION,
  PermissionSchema
);
