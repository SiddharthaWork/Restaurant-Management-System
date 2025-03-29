import mongoose, { Document, Schema } from "mongoose";
import { IReservation, IReservationType } from "../types/reservation.types";
import constants from "../constants";
import { TimeSlotSchema } from "./employee.model";

const reservationType = new Schema<IReservationType>({
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
})
export const ReservationType = mongoose.model<IReservationType>(
  constants.DB.RESERVATIONTYPE,
  reservationType
);

const ReservationSchema = new Schema<IReservation>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.RESTAURANT,
      required: true,
    },
    reservationType: {
      type: Schema.Types.ObjectId,
      ref: constants.DB.RESERVATIONTYPE,
      required: true,
    },
    pax: {
      type: Number,
      required: true,
      min: 1,
    },
    table: [
      {
        type: Schema.Types.ObjectId,
        ref: constants.DB.TABLE,
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    time: TimeSlotSchema,
    client: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
    },
    deposit: {
      type: Boolean,
      default: false,
    },
    additional: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Reservation = mongoose.model<IReservation>(
  constants.DB.RESERVATION,
  ReservationSchema
);

export { Reservation, IReservation };
