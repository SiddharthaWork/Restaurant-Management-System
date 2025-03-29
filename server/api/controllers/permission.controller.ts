import { Response } from "express";
import { AuthenticatedRequest } from "../types/common.types";
import { Permission } from "../models/permissions.model";
import { formatResponse } from "../utilities/formatRes";
import Logger from "../../utils/logUtils";
import constants from "../constants";
import { updatePermissionSchema } from "../zod_schema/permissionSchema";
import helper from "../utilities/permissionHelpers";


const permissionController = {
  getAll: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const restaurantId = req.query.restaurantId;

      const query = restaurantId ? { restaurant: restaurantId } : {};
      const [permissions, total] = await Promise.all([
        Permission.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user", "name email")
          .lean()
          .exec(),
        Permission.countDocuments(query),
      ]);
      // Decode permissions
      const decodedPermissions =
        helper.decodePermissionObject(permissions);

      return formatResponse(
        res,
        200,
        true,
        "Permissions retrieved successfully",
        {
          decodedPermissions,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit,
          },
        }
      );
    } catch (error) {
      Logger.error("Error in getAllPermissions:", error);
      return formatResponse(res, 500, false, "Error retrieving permissions");
    }
  },

  // Get permission by ID
  getById: async (req: AuthenticatedRequest, res: Response) => {
    try {
      //UserId
      const { id } = req.params;
      if (!constants.objectIdRegex.test(id)) {
        return formatResponse(res, 400, false, "Invalid user ID format");
      }
      const permission = await Permission.find({ user: id })
        .populate("user", "name email")
        .lean()
        .exec();
      if (!permission || permission.length === 0) {
        return formatResponse(res, 404, false, "Permission not found");
      }
      const decodedPermission = helper.decodePermissionObject(permission);
      return formatResponse(
        res,
        200,
        true,
        "Permission retrieved successfully",
        decodedPermission
      );
    } catch (error) {
      Logger.error("Error in getPermissionById:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error retrieving permission",
        error
      );
    }
  },

  // Update permission
  update: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      if (!constants.objectIdRegex.test(id)) {
        return formatResponse(res, 400, false, "Invalid user ID format");
      }

      const validatedData = await updatePermissionSchema.parseAsync(req.body);

      // Get existing permission document
      const existingPermission = await Permission.findOne({ user: id });
      if (!existingPermission) {
        return formatResponse(res, 404, false, "Permission not found");
      }

      // Create a map of existing modules for easier lookup
      const existingModulesMap = new Map(
        existingPermission.module.map((module) => [module.name, module])
      );

      // Process each module in the update request
      const updatedModules = validatedData.module.map((newModule: any) => {
        const existingModule = existingModulesMap.get(newModule.name);

        // If module exists, merge with new data, otherwise create new
        const processedModule: any = {
          name: newModule.name,
          permissions: Array.isArray(newModule.permissions)
            ? helper.convertPermissionsToBitmask(newModule.permissions)
            : existingModule?.permissions || 0,
        };

        // Handle submodules
        if (newModule.subModule) {
          const existingSubModulesMap = new Map(
            existingModule?.subModule?.map((sub) => [sub.name, sub]) || []
          );

          // Process each submodule in the update request
          const updatedSubModules = newModule.subModule.map((newSub: any) => {
            const existingSubModule = existingSubModulesMap.get(newSub.name);

            return {
              name: newSub.name,
              permissions: Array.isArray(newSub.permissions)
                ? helper.convertPermissionsToBitmask(newSub.permissions)
                : existingSubModule?.permissions || 0,
            };
          });

          // Preserve existing submodules that aren't being updated
          if (existingModule?.subModule) {
            existingModule.subModule.forEach((existingSub) => {
              if (
                !updatedSubModules.find((sub:any) => sub.name === existingSub.name)
                
              ) {
                updatedSubModules.push(existingSub);
              }
            });
          }

          processedModule.subModule = updatedSubModules;
        } else if (existingModule?.subModule) {
          processedModule.subModule = existingModule.subModule;
        } else {
          processedModule.subModule = [];
        }

        return processedModule;
      });

      // Preserve existing modules that aren't being updated
      existingPermission.module.forEach((existingMod) => {
        if (!updatedModules.find((m) => m.name === existingMod.name)) {
          updatedModules.push(existingMod);
        }
      });

      // Update the permission document
      const updatedPermission = await Permission.findOneAndUpdate(
        { user: id },
        { $set: { module: updatedModules } },
        {
          new: true,
          lean: true,
        }
      ).populate("user", "name email");

      return formatResponse(
        res,
        200,
        true,
        "Permission updated successfully",
        updatedPermission
      );
    } catch (error) {
      Logger.error("Error in updatePermission:", error);
      return formatResponse(
        res,
        500,
        false,
        "Error updating permission",
        error
      );
    }
  },
};

export default permissionController;
