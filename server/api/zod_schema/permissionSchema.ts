import { z } from "zod";
import constants from "../constants";

// Define the submodule schema
const SubmoduleSchema = z.object({
  name: z.string(),
  permissions: z.array(
    z.enum(Object.values(constants.PERMISSIONS) as [string, ...string[]], {
      errorMap: (issue, ctx) => ({
        message: `Invalid permission: ${
          ctx.data
        }. Must be one of: ${Object.values(constants.PERMISSIONS).join(", ")}`,
      }),
    })
  ),
});

// Define the module schema
const ModuleSchema = z.object({
  name: z.enum(
    Object.values(constants.PERMISSIONMODULES) as [string, ...string[]],
    {
      errorMap: (issue, ctx) => ({
        message: `Invalid module: ${ctx.data}. Must be one of: ${Object.values(
          constants.PERMISSIONMODULES
        ).join(", ")}`,
      }),
    }
  ),
  permissions: z.array(
    z.enum(Object.values(constants.PERMISSIONS) as [string, ...string[]], {
      errorMap: (issue, ctx) => ({
        message: `Invalid permission: ${
          ctx.data
        }. Must be one of: ${Object.values(constants.PERMISSIONS).join(", ")}`,
      }),
    })
  ),
  subModule: z.array(SubmoduleSchema).optional(),
});

// Define the main permission schema
export const PermissionSchema = z
  .object({
    module: z.array(ModuleSchema),
    user: z.string().regex(constants.objectIdRegex, "Invalid MongooseId"),
  })
  .superRefine((data, ctx) => {
    // Validate each module's submodules
    data.module.forEach((moduleData, moduleIndex) => {
      const invalidSubmodules = moduleData.subModule?.filter(
        (submodule) =>
          !constants.MODULE_SUBMODULE_MAP[moduleData.name]?.includes(
            submodule.name
          )
      );

      if (invalidSubmodules && invalidSubmodules.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid submodules for module ${
            moduleData.name
          }: ${invalidSubmodules.map((sm) => sm.name).join(", ")}`,
          path: ["module", moduleIndex, "subModule"],
        });
      }
    });
  });

//* Permission update schema
export const updatePermissionSchema = z
  .object({
    module: z.array(
      z.object({
        name: z.enum(
          Object.values(constants.PERMISSIONMODULES) as [string, ...string[]],
          {
            errorMap: (issue, ctx) => ({
              message: `Invalid module: ${
                ctx.data
              }. Must be one of: ${Object.values(
                constants.PERMISSIONMODULES
              ).join(", ")}`,
            }),
          }
        ),
        permissions: z
          .array(
            z.enum(
              Object.values(constants.PERMISSIONS) as [string, ...string[]],
              {
                errorMap: (issue, ctx) => ({
                  message: `Invalid permission: ${
                    ctx.data
                  }. Must be one of: ${Object.values(
                    constants.PERMISSIONS
                  ).join(", ")}`,
                }),
              }
            )
          )
          .optional(),
        subModule: z.array(SubmoduleSchema).optional(),
      })
    ),
  })
  .superRefine((data, ctx) => {
    // Validate each module's submodules
    data.module?.forEach((moduleData, moduleIndex) => {
      const invalidSubmodules = moduleData.subModule?.filter(
        (submodule) =>
          !constants.MODULE_SUBMODULE_MAP[moduleData.name]?.includes(
            submodule.name
          )
      );

      if (invalidSubmodules && invalidSubmodules.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid submodules for module ${
            moduleData.name
          }: ${invalidSubmodules.map((sm) => sm.name).join(", ")}`,
          path: ["module", moduleIndex, "subModule"],
        });
      }
    });
  });
