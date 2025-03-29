import constants from "../constants";

const { PERMISSION_LEVELS } = constants;

interface Permission {
  module: {
    name: string;
    permissions: number;
    subModule?: {
      name: string;
      permissions: number;
    }[];
  }[];
  user?: any;
}
// Permission helper functions
const PermissionHelpers = {
  convertPermissionsToBitmask: (permissions: string[]): number =>
    permissions.reduce((bitmask, permission) => {
      const level =
        PERMISSION_LEVELS[
          permission.toUpperCase() as keyof typeof PERMISSION_LEVELS
        ];
      return level ? bitmask | level : bitmask;
    }, 0),
  convertBitmaskToPermissions: (bitmask: number): string[] => {
    return Object.entries(PERMISSION_LEVELS)
      .filter(([_, level]) => bitmask & level)
      .map(([permission]) => permission);
  },
  decodePermissionObject: (permissions: Permission | Permission[]): any => {
    const decode = (permission: Permission) => {
      const decodedModules = permission.module.map((mod) => ({
        name: mod.name,
        permissions: PermissionHelpers.convertBitmaskToPermissions(
          mod.permissions
        ),
        subModule: mod.subModule?.map((sub) => ({
          name: sub.name,
          permissions: PermissionHelpers.convertBitmaskToPermissions(
            sub.permissions
          ),
        })),
      }));

      return {
        ...permission,
        module: decodedModules,
      };
    };

    return Array.isArray(permissions)
      ? permissions.map(decode)
      : decode(permissions);
  },

  hasPermission: (
    userPermission: number,
    requiredPermission: number
  ): boolean => {
    return (userPermission & requiredPermission) === requiredPermission;
  },
  canRead: (permission: number): boolean => {
    return PermissionHelpers.hasPermission(permission, PERMISSION_LEVELS.READ);
  },

  canWrite: (permission: number): boolean => {
    return PermissionHelpers.hasPermission(permission, PERMISSION_LEVELS.WRITE);
  },

  canUpdate: (permission: number): boolean => {
    return PermissionHelpers.hasPermission(
      permission,
      PERMISSION_LEVELS.UPDATE
    );
  },

  canDelete: (permission: number): boolean => {
    return PermissionHelpers.hasPermission(
      permission,
      PERMISSION_LEVELS.DELETE
    );
  },

  getPermissionName: (permission: number): string => {
    const names: string[] = [];
    if (permission === PERMISSION_LEVELS.NONE) return "None";
    if (PermissionHelpers.canRead(permission)) names.push("Read");
    if (PermissionHelpers.canWrite(permission)) names.push("Write");
    if (PermissionHelpers.canUpdate(permission)) names.push("Update");
    if (PermissionHelpers.canDelete(permission)) names.push("Delete");
    return names.join(", ");
  },
};
export default PermissionHelpers;
