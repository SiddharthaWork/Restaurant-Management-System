import { Response } from "express";
import mongoose from "mongoose";

import { Attendance } from "../models/attendance.model";

import constants from "../constants";
import { formatResponse } from "../utilities/formatRes";
import { AuthenticatedRequest } from "../types/common.types";
import Logger from "../../utils/logUtils";

const attendanceController = {
  //* Create new attendance record
  create: async (req: AuthenticatedRequest, res: Response) => {
    try {
      //* Get restaurant ID based on user role
      let restaurant;
      if (req.user?.isSuperAdmin && req.body.restaurant) {
        restaurant = req.body.restaurant;
        if (!mongoose.Types.ObjectId.isValid(restaurant)) {
          return formatResponse(
            res,
            400,
            false,
            "Invalid restaurant ID format"
          );
        }
      } else if (req.user?.restaurant) {
        restaurant = req.user.restaurant;
      } else {
        if (req.user?.isSuperAdmin) {
          return formatResponse(
            res,
            403,
            false,
            "Please specify a restaurant ID as a superAdmin"
          );
        }
        return formatResponse(
          res,
          403,
          false,
          "No restaurant ID associated with the user"
        );
      }

      //* Validate user ID
      if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
        return formatResponse(res, 400, false, "Invalid user ID format");
      }

      //* Check if attendance already exists for the current day
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const existingAttendance = await Attendance.findOne({
        user: req.body.user,
        restaurant,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });
      if (existingAttendance) {
        return formatResponse(
          res,
          400,
          false,
          "Attendance record already exists for this user today"
        );
      }

      //* Create new attendance record
      const newAttendance = new Attendance({
        ...req.body,
        restaurant,
        status: req.body.status || constants.ATTENDANCESTATUS.ABSENT,
      });

      const savedAttendance = await newAttendance.save();

      return formatResponse(
        res,
        201,
        true,
        "Attendance record created successfully",
        savedAttendance
      );
    } catch (error: any) {
      Logger.error(error);
      return formatResponse(
        res,
        500,
        false,
        "Error creating attendance record",
        error
      );
    }
  },

  //* Get all attendance records
  getAll: async (req: AuthenticatedRequest, res: Response) => {
    Logger.info("Fetching all attendance records");
    try {
      let query: any = {};

      //* Apply restaurant filter based on user role
      if (!req.user?.isSuperAdmin) {
        if (!req.user?.restaurant) {
          return formatResponse(
            res,
            403,
            false,
            "No restaurant ID associated with the user"
          );
        }
        query.restaurant = req.user.restaurant;
      } else if (req.query.restaurant) {
        query.restaurant = req.query.restaurant;
      }

      //* Add date range filter if provided
      if (req.query.startDate && req.query.endDate) {
        query = {
          ...query,
          createdAt: {
            $gte: new Date(req.query.startDate as string),
            $lte: new Date(req.query.endDate as string),
          },
        };
      }

      //* Add user filter if provided
      if (
        req.query.user &&
        mongoose.Types.ObjectId.isValid(req.query.user as string)
      ) {
        query = { ...query, user: req.query.user };
      }

      const attendanceRecords = await Attendance.find(query)
        .populate("user", "name email") //* Populate user details
        .populate("restaurant", "name") //* Populate restaurant details
        .sort({ createdAt: -1 }); //* Sort by latest first

      return formatResponse(
        res,
        200,
        true,
        "Attendance records retrieved successfully",
        attendanceRecords
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(
        res,
        500,
        false,
        "Error fetching attendance records",
        error
      );
    }
  },

  //* Get attendance record by ID
  getById: async (req: AuthenticatedRequest, res: Response) => {
    Logger.info("Fetching attendance record by ID");
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return formatResponse(
          res,
          400,
          false,
          "Invalid attendance record ID format"
        );
      }

      let query: any = { _id: req.params.id };

      //* Apply restaurant filter for non-super admin users
      if (!req.user?.isSuperAdmin) {
        if (!req.user?.restaurant) {
          return formatResponse(
            res,
            403,
            false,
            "No restaurant ID associated with the user"
          );
        }
        query.restaurant = req.user.restaurant;
      }

      const attendance = await Attendance.findOne(query)
        .populate("user", "name email")
        .populate("restaurant", "name");

      if (!attendance) {
        return formatResponse(res, 404, false, "Attendance record not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Attendance record retrieved successfully",
        attendance
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(
        res,
        500,
        false,
        "Error fetching attendance record",
        error
      );
    }
  },

  //* Update attendance record
  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return formatResponse(
          res,
          400,
          false,
          "Invalid attendance record ID format"
        );
      }

      let query: any = { _id: req.params.id };

      //* Apply restaurant filter for non-super admin users
      if (!req.user?.isSuperAdmin) {
        if (!req.user?.restaurant) {
          return formatResponse(
            res,
            403,
            false,
            "No restaurant ID associated with the user"
          );
        }
        query.restaurant = req.user.restaurant;
      }

      //* First get the existing attendance record
      const existingAttendance = await Attendance.findOne(query);
      if (!existingAttendance) {
        return formatResponse(res, 404, false, "Attendance record not found");
      }

      //* Validate check-in and check-out times
      const updatedCheckIn = req.body.checkIn || existingAttendance.checkIn;
      const updatedCheckOut = req.body.checkOut || existingAttendance.checkOut;

      //* If both check-in and check-out are present
      if (updatedCheckIn && updatedCheckOut) {
        const checkInTime = new Date(updatedCheckIn).getTime();
        const checkOutTime = new Date(updatedCheckOut).getTime();

        if (checkInTime >= checkOutTime) {
          return formatResponse(
            res,
            400,
            false,
            "Check-in time must be earlier than check-out time"
          );
        }
      }

      //* Prevent updating user and restaurant references
      delete req.body.user;
      delete req.body.restaurant;

      const updatedAttendance = await Attendance.findOneAndUpdate(
        query,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("user", "name email")
        .populate("restaurant", "name");

      if (!updatedAttendance) {
        return formatResponse(res, 404, false, "Attendance record not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Attendance record updated successfully",
        updatedAttendance
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(
        res,
        400,
        false,
        "Error updating attendance record",
        error
      );
    }
  },

  //* Delete attendance record
  delete: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return formatResponse(
          res,
          400,
          false,
          "Invalid attendance record ID format"
        );
      }

      let query: any = { _id: req.params.id };

      //* Apply restaurant filter for non-super admin users
      if (!req.user?.isSuperAdmin) {
        if (!req.user?.restaurant) {
          return formatResponse(
            res,
            403,
            false,
            "No restaurant ID associated with the user"
          );
        }
        query.restaurant = req.user.restaurant;
      }

      const deletedAttendance = await Attendance.findOneAndDelete(query);

      if (!deletedAttendance) {
        return formatResponse(res, 404, false, "Attendance record not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Attendance record deleted successfully"
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(
        res,
        500,
        false,
        "Error deleting attendance record",
        error
      );
    }
  },

  //* Check-in
  checkIn: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return formatResponse(res, 401, false, "User not authenticated");
      }

      if (!req.user?.restaurant) {
        return formatResponse(
          res,
          403,
          false,
          "No restaurant ID associated with the user"
        );
      }

      //* Check if there's already an attendance record for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let attendance = await Attendance.findOne({
        user: userId,
        restaurant: req.user.restaurant,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      if (attendance) {
        //*update the attendance record
        if (attendance.checkIn) {
          return formatResponse(res, 400, false, "You are already checked in");
        }

        attendance.checkIn = new Date().toISOString();
        attendance.status = constants.ATTENDANCESTATUS.ONGOING;
        const updatedAttendance = await attendance.save();
        return formatResponse(
          res,
          200,
          true,
          "Check-in successful",
          updatedAttendance
        );
      }

      //* Create new attendance record
      attendance = new Attendance({
        user: userId,
        restaurant: req.user.restaurant,
        checkIn: new Date().toISOString(),
        status: constants.ATTENDANCESTATUS.ONGOING,
      });

      const savedAttendance = await attendance.save();

      return formatResponse(
        res,
        200,
        true,
        "Check-in successful",
        savedAttendance
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(res, 500, false, "Error during check-in", error);
    }
  },

  //* Check-out
  checkOut: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return formatResponse(res, 401, false, "User not authenticated");
      }

      if (!req.user?.restaurant) {
        return formatResponse(
          res,
          403,
          false,
          "No restaurant ID associated with the user"
        );
      }

      //* Find today's ongoing attendance record
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const attendance = await Attendance.findOne({
        user: userId,
        restaurant: req.user.restaurant,
        status: constants.ATTENDANCESTATUS.ONGOING,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      if (!attendance) {
        return formatResponse(
          res,
          404,
          false,
          "No ongoing attendance record found"
        );
      }

      attendance.checkOut = new Date().toISOString();
      attendance.status = constants.ATTENDANCESTATUS.PRESENT;
      const savedAttendance = await attendance.save();

      return formatResponse(
        res,
        200,
        true,
        "Check-out successful",
        savedAttendance
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(res, 500, false, "Error during check-out", error);
    }
  },
};
export default attendanceController;
