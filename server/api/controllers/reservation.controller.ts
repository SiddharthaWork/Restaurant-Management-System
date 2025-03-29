import { Response } from "express";
import { Reservation } from "../models/reservation.model";
import { Table } from "../models/table.model";
import { formatResponse } from "../utilities/formatRes";
import { AuthenticatedRequest } from "../types/common.types";
import mongoose from "mongoose";
import { reservationSchema } from "../zod_schema/reservationSchema";

// Helper function to convert time string to minutes
function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

const reservationController = {
  // Create a new reservation with table validation
  async create(req: AuthenticatedRequest, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const data = await reservationSchema.parseAsync(req.body);
      const { table: tableIds, time, date, ...rest } = data;

      const restaurant =
        req.user?.isSuperAdmin && rest.restaurant
          ? rest.restaurant
          : req.user?.restaurant;

      if (!restaurant) {
        throw new Error(
          req.user?.isSuperAdmin
            ? "Please specify a restaurant ID as a superAdmin"
            : "No restaurant ID associated with the user"
        );
      }

      const existedReservation = await Reservation.findOne({
        table: { $in: tableIds },
        date: date,
      })
        .select("table")
        .populate("table", "times name");

      if (existedReservation) {
        // Convert requested time to minutes for comparison
        const requestedFromTime = convertTimeToMinutes(time.from);
        const requestedToTime = convertTimeToMinutes(time.to);
        if (requestedToTime < requestedFromTime) {
          formatResponse(res, 400, false, "Requested time range is invalid");
          return;
        }
        const convertedDate = new Date(date);
        existedReservation.table.forEach((table: any) => {
          table.times.forEach((timeSlot: any) => {
            if (
              timeSlot.date.toISOString().split("T")[0] ===
              convertedDate.toISOString().split("T")[0]
            ) {
              const existingFromTime = convertTimeToMinutes(timeSlot.time.from);
              const existingToTime = convertTimeToMinutes(timeSlot.time.to);

              // Check for any overlap between time slots
              if (
                // New reservation starts during existing reservation
                (requestedFromTime >= existingFromTime &&
                  requestedFromTime < existingToTime) ||
                // New reservation ends during existing reservation
                (requestedToTime > existingFromTime &&
                  requestedToTime <= existingToTime) ||
                // New reservation completely contains existing reservation
                (requestedFromTime <= existingFromTime &&
                  requestedToTime >= existingToTime) ||
                // Existing reservation completely contains new reservation
                (requestedFromTime >= existingFromTime &&
                  requestedToTime <= existingToTime)
              ) {
                throw new Error(
                  `Table ${table.name} is already reserved from ${timeSlot.time.from} to ${timeSlot.time.to}`
                );
              }
            }
          });
        });
      }
      const tables = await Table.find({
        _id: { $in: tableIds },
        restaurant,
      }).session(session);

      if (tables.length !== tableIds.length) {
        throw new Error(
          "One or more tables not found or don't belong to the restaurant"
        );
      }

      const totalCapacity = tables.reduce(
        (sum, table) => sum + table.capacity,
        0
      );
      if (totalCapacity < rest.pax) {
        throw new Error(`Not enough capacity for ${rest.pax} people`);
      }

      const reservation = new Reservation({
        table: tableIds,
        time,
        date,
        restaurant,
        ...rest,
      });
      await reservation.save({ session });

      const timeSlot = {
        time,
        reservation: reservation._id,
        date: reservation.date,
      };

      await Table.updateMany(
        { _id: { $in: tableIds } },
        { $push: { times: timeSlot } },
        { session }
      );

      await session.commitTransaction();

      const populatedReservation = await Reservation.findById(
        reservation._id
      ).populate("restaurant reservationType table");

      return formatResponse(
        res,
        201,
        true,
        "Reservation created successfully",
        populatedReservation
      );
    } catch (error: any) {
      await session.abortTransaction();
      console.log(error);
      return formatResponse(
        res,
        400,
        false,
        error.message || "Error creating reservation"
      );
    } finally {
      session.endSession();
    }
  },

  // Get all reservations
  async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      let query = {};
      // If not a super admin, filter by user's restaurant
      if (!req.user?.isSuperAdmin) {
        query = { restaurant: req.user?.restaurant };
      } else if (req.query.restaurant) {
        // Super admin can optionally filter by restaurant ID
        query = { restaurant: req.query.restaurant };
      }

      const reservations = await Reservation.find(query)
        .populate("restaurant reservationType table")
        .exec();

      return formatResponse(
        res,
        200,
        true,
        "Reservations fetched successfully",
        reservations
      );
    } catch (error: any) {
      return formatResponse(
        res,
        500,
        false,
        error.message || "Error fetching reservations",
        error
      );
    }
  },

  // Get a reservation by ID
  async getById(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return formatResponse(res, 400, false, "Invalid reservation ID format");
      }

      let query: any = { _id: id };
      // If not a super admin, ensure the reservation belongs to user's restaurant
      if (!req.user?.isSuperAdmin) {
        query.restaurant = req.user?.restaurant;
      }

      const reservation = await Reservation.findOne(query)
        .populate("restaurant reservationType table")
        .exec();

      if (!reservation) {
        return formatResponse(res, 404, false, "Reservation not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Reservation fetched successfully",
        reservation
      );
    } catch (error: any) {
      return formatResponse(
        res,
        500,
        false,
        error.message || "Error fetching reservation",
        error
      );
    }
  },

  async update(req: AuthenticatedRequest, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      const data = await reservationSchema.parseAsync(req.body);
      const { table: tableIds, time, date, ...rest } = data;

      let query: any = { _id: id };
      if (!req.user?.isSuperAdmin) {
        query.restaurant = req.user?.restaurant;
      }

      const existingReservation = await Reservation.findOne(query)
        .populate("table", "times name")
        .session(session);

      if (!existingReservation) {
        throw new Error("Reservation not found");
      }

      // Check for table availability if tables or time changed
      if (tableIds && time) {
        const existedReservation = await Reservation.findOne({
          _id: { $ne: id },
          table: { $in: tableIds },
          date: date || existingReservation.date,
        })
          .select("table")
          .populate("table", "times name")
          .session(session);

        if (existedReservation) {
          const requestedFromTime = convertTimeToMinutes(time.from);
          const requestedToTime = convertTimeToMinutes(time.to);
          const convertedDate = new Date(date || existingReservation.date);

          existedReservation.table.forEach((table: any) => {
            table.times.forEach((timeSlot: any) => {
              if (
                timeSlot.date.toISOString().split("T")[0] ===
                convertedDate.toISOString().split("T")[0]
              ) {
                const existingFromTime = convertTimeToMinutes(
                  timeSlot.time.from
                );
                const existingToTime = convertTimeToMinutes(timeSlot.time.to);

                if (
                  (requestedFromTime >= existingFromTime &&
                    requestedFromTime < existingToTime) ||
                  (requestedToTime > existingFromTime &&
                    requestedToTime <= existingToTime) ||
                  (requestedFromTime <= existingFromTime &&
                    requestedToTime >= existingToTime) ||
                  (requestedFromTime >= existingFromTime &&
                    requestedToTime <= existingToTime)
                ) {
                  throw new Error(
                    `Table ${table.name} is already reserved from ${timeSlot.time.from} to ${timeSlot.time.to}`
                  );
                }
              }
            });
          });
        }

        // Validate table capacity if tables or pax changed
        if (tableIds || rest.pax) {
          const tables = await Table.find({
            _id: { $in: tableIds || existingReservation.table },
            restaurant: existingReservation.restaurant,
          }).session(session);

          if (
            tables.length !==
            (tableIds?.length || existingReservation.table.length)
          ) {
            throw new Error(
              "One or more tables not found or don't belong to the restaurant"
            );
          }

          const totalCapacity = tables.reduce(
            (sum, table) => sum + table.capacity,
            0
          );
          if (totalCapacity < (rest.pax || existingReservation.pax)) {
            throw new Error(
              `Not enough capacity for ${
                rest.pax || existingReservation.pax
              } people`
            );
          }
        }

        // Remove old table times
        await Table.updateMany(
          { _id: { $in: existingReservation.table } },
          { $pull: { times: { reservationId: existingReservation._id } } },
          { session }
        );

        // Add new table times
        const timeSlot = {
          time: time || existingReservation.time,
          reservationId: existingReservation._id,
          date: date || existingReservation.date,
        };

        await Table.updateMany(
          { _id: { $in: tableIds || existingReservation.table } },
          { $push: { times: timeSlot } },
          { session }
        );
      }

      // Update reservation
      const updatedReservation = await Reservation.findOneAndUpdate(
        query,
        {
          ...rest,
          table: tableIds || existingReservation.table,
          time: time || existingReservation.time,
          date: date || existingReservation.date,
        },
        { new: true, runValidators: true, session }
      ).populate("restaurant reservationType table");

      await session.commitTransaction();
      return formatResponse(
        res,
        200,
        true,
        "Reservation updated successfully",
        updatedReservation
      );
    } catch (error: any) {
      await session.abortTransaction();
      console.log(error);
      return formatResponse(
        res,
        400,
        false,
        error.message || "Error updating reservation"
      );
    } finally {
      session.endSession();
    }
  },

  async delete(req: AuthenticatedRequest, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      let query: any = { _id: id };

      if (!req.user?.isSuperAdmin) {
        query.restaurant = req.user?.restaurant;
      }

      const deletedReservation = await Reservation.findOne(query).session(
        session
      );
      if (!deletedReservation) {
        throw new Error("Reservation not found");
      }

      await Table.updateMany(
        { _id: { $in: deletedReservation.table } },
        { $pull: { times: { reservation: deletedReservation._id } } },
        { session }
      );

      await Reservation.findOneAndDelete(query).session(session);
      await session.commitTransaction();

      return formatResponse(res, 200, true, "Reservation deleted successfully");
    } catch (error: any) {
      await session.abortTransaction();
      return formatResponse(
        res,
        error.message === "Reservation not found" ? 404 : 500,
        false,
        error.message || "Error deleting reservation"
      );
    } finally {
      session.endSession();
    }
  },
};

export default reservationController;
