import { Response } from "express";

import { User } from "../models/user.model";
import { AuthenticatedRequest } from "../types/common.types";
import { formatResponse } from "../utilities/formatRes";
import Logger from "../../utils/logUtils";
import { CRUDController } from "../utilities/createControllerRoute";
import { updateUserSchema } from "../zod_schema/authSchema";

const employeeController: Partial<CRUDController> = {
  getAll: async (req: AuthenticatedRequest, res: Response) => {
    const restaurantId = req.user?.restaurant;
    let baseQuery;
    let matchWithRestaurant = {
      _id: { $ne: null },
      restaurant: restaurantId,
    };
    try {
      const populateQuery = [
        {
          path: "restaurant",
          select: "name",
          match: { _id: { $ne: null } },
        },
        {
          path: "position",
          select: "name",
          match: matchWithRestaurant,
        },
        {
          path: "shiftType",
          select: "name",
          match: matchWithRestaurant,
        },
        {
          path: "empRole",
          select: "name",
          match: matchWithRestaurant,
        },
        {
          path: "department",
          select: "name",
          match: matchWithRestaurant,
        },
      ];

      //* Only populate if user is not superadmin
      if (!req.user?.isSuperAdmin) {
        baseQuery = User.find().select("-password").populate(populateQuery);
      } else {
        baseQuery = User.find()
          .select("-password")
          .populate([
            {
              path: "restaurant",
              match: { _id: { $ne: null } },
            },
          ]);
      }

      //* If user is admin, filter by their restaurant
      if (!req.user?.isSuperAdmin) {
        baseQuery.where("restaurant").equals(req.user?.restaurant);
      }

      const employees = await baseQuery.exec();

      return formatResponse(
        res,
        200,
        true,
        "Employees retrieved successfully",
        employees
      );
    } catch (error) {
      Logger.error(error);
      return formatResponse(res, 500, false, "Error fetching employees", error);
    }
  },

  getById: async (req: AuthenticatedRequest, res: Response) => {
    try {
      //* Base query to exclude sensitive fields
      const baseQuery = User.findById(req.params.id).select("-password");

      //* If user is admin, ensure the employee belongs to their restaurant
      if (!req.user?.isSuperAdmin) {
        baseQuery.where("restaurant").equals(req.user?.restaurant);
      }

      const employee = await baseQuery.exec();

      //* Check if employee exists
      if (!employee) {
        return formatResponse(res, 404, false, "Employee not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Employee retrieved successfully",
        employee
      );
    } catch (error) {
      return formatResponse(res, 500, false, "Internal server error", error);
    }
  },
  getMyProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const employee = await User.findById(req.user?.id).select("-password");
      if (!employee) {
        return formatResponse(res, 404, false, "Employee not found");
      }
      return formatResponse(
        res,
        200,
        true,
        "Employee retrieved successfully",
        employee
      );
    } catch (error) {
      return formatResponse(res, 500, false, "Error fetching employee", error);
    }
  },
  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const updatedEmployee = await User.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!updatedEmployee) {
        return formatResponse(res, 404, false, "Employee not found");
      }
      return formatResponse(
        res,
        200,
        true,
        "Employee updated successfully",
        updatedEmployee
      );
    } catch (error) {
      return formatResponse(res, 500, false, "Error updating employee", error);
    }
  },

  updateMyProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      req.body = await updateUserSchema.parseAsync(req.body);
      const updatedEmployee = await User.findByIdAndUpdate(
        req.user?.id,
        req.body
      ).select("-password");
      if (!updatedEmployee) {
        return formatResponse(res, 404, false, "Employee not found");
      }
      return formatResponse(
        res,
        200,
        true,
        "Employee updated successfully",
        updatedEmployee
      );
    } catch (error) {
      return formatResponse(res, 500, false, "Error updating employee", error);
    }
  },
};
export default employeeController;
