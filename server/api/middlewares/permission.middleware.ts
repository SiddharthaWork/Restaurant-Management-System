import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/common.types";
import { Permission } from "../models/permissions.model";
import Logger from "../../utils/logUtils";
import { formatResponse } from "../utilities/formatRes";

import constants from "../constants";
import PermissionHelpers from "../utilities/permissionHelpers";

const { PERMISSION_LEVELS } = constants;

export const checkPermission = (
  requiredModule: string,
  requiredPermission: keyof typeof PERMISSION_LEVELS,
  subModule?: string
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return formatResponse(res, 401, false, "User not authenticated");
      }

      if (req.user?.isSuperAdmin) {
        return next();
      }

      const permission = await Permission.findOne({
        user: req.user.id,
      });

      if (!permission) {
        return formatResponse(
          res,
          403,
          false,
          "No permissions found for this user"
        );
      }

      const module = permission.module.find(
        (m) => m.name.toLowerCase() === requiredModule.toLowerCase()
      );

      if (!module) {
        return formatResponse(
          res,
          403,
          false,
          `No access to module: ${requiredModule}`
        );
      }

      let permissionValue: number;

      if (subModule) {
        const sub = module.subModule?.find(
          (sm) => sm.name.toLowerCase() === subModule.toLowerCase()
        );
        if (!sub) {
          return formatResponse(
            res,
            403,
            false,
            `No access to submodule: ${subModule}`
          );
        }
        permissionValue = Array.isArray(sub.permissions)
          ? sub.permissions.reduce((acc, curr) => acc | curr, 0)
          : sub.permissions;
      } else {
        permissionValue = Array.isArray(module.permissions)
          ? module.permissions.reduce((acc, curr) => acc | curr, 0)
          : module.permissions;
      }

      if (
        !PermissionHelpers.hasPermission(
          permissionValue,
          PERMISSION_LEVELS[requiredPermission]
        )
      ) {
        return formatResponse(
          res,
          403,
          false,
          `Missing required permission: ${requiredPermission} for ${
            subModule ? "submodule" : "module"
          }: ${subModule || requiredModule}`
        );
      }

      next();
    } catch (error) {
      Logger.error("Error checking permissions: ", error);
      return formatResponse(
        res,
        500,
        false,
        "Internal server error while checking permission"
      );
    }
  };
};

export const combinePermissionChecks = (
  permissionChecks: Array<{
    module: string;
    permission: keyof typeof PERMISSION_LEVELS;
    subModule?: string;
  }>
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return formatResponse(res, 401, false, "User not authenticated");
      }

      const permission = await Permission.findOne({
        user: req.user.id,
      });

      if (!permission) {
        return formatResponse(
          res,
          403,
          false,
          "No permissions found for this user"
        );
      }

      for (const check of permissionChecks) {
        const module = permission.module.find(
          (m) => m.name.toLowerCase() === check.module.toLowerCase()
        );
        if (!module) {
          return formatResponse(
            res,
            403,
            false,
            `No access to module: ${check.module}`
          );
        }

        let permissionValue: number;

        if (check.subModule) {
          const sub = module.subModule?.find(
            (sm) => sm.name.toLowerCase() === check.subModule!.toLowerCase()
          );
          if (!sub) {
            return formatResponse(
              res,
              403,
              false,
              `No access to submodule: ${check.subModule}`
            );
          }
          permissionValue = Array.isArray(sub.permissions)
            ? sub.permissions.reduce((acc, curr) => acc | curr, 0)
            : sub.permissions;
        } else {
          permissionValue = Array.isArray(module.permissions)
            ? module.permissions.reduce((acc, curr) => acc | curr, 0)
            : module.permissions;
        }

        if (
          !PermissionHelpers.hasPermission(
            permissionValue,
            PERMISSION_LEVELS[check.permission]
          )
        ) {
          return formatResponse(
            res,
            403,
            false,
            `Missing required permission: ${check.permission} for ${
              check.subModule ? "submodule" : "module"
            }: ${check.subModule || check.module}`
          );
        }
      }

      next();
    } catch (error) {
      Logger.error("Permission check error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Internal server error during permission check"
      );
    }
  };
};
