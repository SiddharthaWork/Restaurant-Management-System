import { Types } from "mongoose";

import constants from "../constants";
import { Permission } from "../models/permissions.model";

const createUserPermissions = async (
  userId: string,
  role: string,
  restaurantId:Types.ObjectId
): Promise<void> => {
  try {
    const { PERMISSION_COMBINATIONS } = constants;
    const permissionModules = Object.values(constants.PERMISSIONMODULES);
    const moduleSubmoduleMap = constants.MODULE_SUBMODULE_MAP;

    // Determine permission level based on role
    const getPermissionForRole = (role: string): number => {
      switch (role) {
        case constants.USERROLE.ADMIN:
          return PERMISSION_COMBINATIONS.FULL_ACCESS;
        default:
          return PERMISSION_COMBINATIONS.READ_ONLY;
      }
    };

    const rolePermission = getPermissionForRole(role);

    // Initialize permission structure
    const modules = permissionModules.map((moduleName) => {
      // Get submodules for this module
      const subModules =
        moduleSubmoduleMap[moduleName]?.map((subModuleName) => ({
          name: subModuleName,
          permissions: rolePermission,
        })) || [];

      return {
        name: moduleName,
        permissions: rolePermission,
        subModule: subModules,
      };
    });

    // Create permission document
    const permissionDoc = new Permission({
      module: modules,
      user: userId,
      restaurant: restaurantId
    });

    await permissionDoc.save();
  } catch (error) {
    console.error("Error creating permissions:", error);
    throw new Error("Failed to create user permissions");
  }
};

export default createUserPermissions;
