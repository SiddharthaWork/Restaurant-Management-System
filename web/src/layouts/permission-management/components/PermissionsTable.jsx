import CustomButton from "@/components/CustomButton";
import { useGetAllUsersQuery } from "@/redux/api/authApi";
import {
  useLazyGetPermissionByUserIdQuery,
  useUpdatePermissionMutation,
} from "@/redux/api/permissionApi";
import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { actions, permissions } from "./permissionObj";
import { useState } from "react";
import { toast } from "react-toastify";

const transformBackendToFormik = (backendData) => {
  const formikValues = {
    userId: backendData.userId,
  };

  // Iterate through each module
  backendData.module.forEach((module) => {
    module.subModule.forEach((subModule) => {
      // Create a key in format: "Category_ItemName"
      const key = `${module.name}_${subModule.name.replace(/\s+/g, "")}`;

      // Map permissions to boolean values
      formikValues[key] = {
        create: subModule.permissions.includes("WRITE"),
        view: subModule.permissions.includes("READ"),
        edit: subModule.permissions.includes("UPDATE"),
        delete: subModule.permissions.includes("DELETE"),
      };
    });
  });

  return formikValues;
};
const transformFormToBackendData = (formValues) => {
  const modules = new Map();

  Object.entries(formValues).forEach(([key, value]) => {
    if (key === "role") return;

    const [category, item] = key.split("_");

    if (!modules.has(category)) {
      modules.set(category, new Map());
    }

    const permissions = [];
    if (value.create) permissions.push("WRITE");
    if (value.view) permissions.push("READ");
    if (value.edit) permissions.push("UPDATE");
    if (value.delete) permissions.push("DELETE");

    modules.get(category).set(item, permissions);
  });

  const moduleArray = Array.from(modules.entries()).map(
    ([category, subModules]) => ({
      name: category,
      subModule: Array.from(subModules.entries()).map(
        ([name, permissions]) => ({
          name,
          permissions,
        })
      ),
    })
  );

  return { module: moduleArray };
};

const generateInitialValues = () => {
  const initialValues = { userId: null };

  permissions.forEach(({ category, items }) => {
    items.forEach((item) => {
      const key = `${category}_${item.replace(/\s+/g, "")}`;
      initialValues[key] = {
        create: false,
        view: false,
        edit: false,
        delete: false,
      };
    });
  });

  return initialValues;
};

const PermissionsTable = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const [updatePermissions, { isLoading: isUpdating }] =
    useUpdatePermissionMutation();
  const [fetchPermissionById] = useLazyGetPermissionByUserIdQuery();

  const fetchPermissions = async (userId) => {
    try {
      const res = await fetchPermissionById(userId).unwrap();
      if (res?.success) {
        return transformBackendToFormik(res?.data[0]);
      }
      return generateInitialValues();
    } catch (error) {
      console.error("Error fetching permissions:", error);
      return generateInitialValues();
    }
  };

  const formik = useFormik({
    initialValues: { ...generateInitialValues(), userId: "" },
    onSubmit: async (values) => {
      try {
        const backendData = transformFormToBackendData(values);
        const response = await updatePermissions({
          body: backendData,
          id: selectedUser?._id,
        }).unwrap();

        if (response.success) {
          toast.success(response?.message);
          console.log("Permissions updated successfully");
        }
        console.log("backendData", backendData);
      } catch (error) {
        console.error("Error saving permissions:", error);
      }
    },
  });

  const { values, setFieldValue, handleSubmit, touched, errors } = formik;
  const handleUserChange = async (_, selectedUser) => {
    if (selectedUser) {
      setFieldValue("userId", selectedUser._id);
      const permissions = await fetchPermissions(selectedUser._id);
      Object.entries(permissions).forEach(([key, value]) => {
        setFieldValue(key, value);
      });
    }
  };

  const toggleAll = (category, action, checked) => {
    const categoryPermissions = permissions.find(
      (perm) => perm.category === category
    );

    if (categoryPermissions) {
      categoryPermissions.items.forEach((item) => {
        const key = `${category}_${item.replace(/\s+/g, "")}`;
        setFieldValue(`${key}.${action.toLowerCase()}`, checked);
      });
    }
  };

  const isAllSelected = (category, action) => {
    const categoryPermissions = permissions.find(
      (perm) => perm.category === category
    );

    if (!categoryPermissions || categoryPermissions.items.length === 0) {
      return false;
    }

    return categoryPermissions.items.every((item) => {
      const key = `${category}_${item.replace(/\s+/g, "")}`;
      return values[key]?.[action.toLowerCase()] === true;
    });
  };
  console.log("selectedUsr", selectedUser);

  return (
    <Stack spacing={2}>
      <FormikProvider value={formik}>
        <Card>
          <CardContent>
            <Box className="flex items-center justify-between">
              <Typography variant="body1">
                Select user to get & set permissions
              </Typography>
              <Autocomplete
                fullWidth
                sx={{ maxWidth: "200px" }}
                value={selectedUser} // Add this
                onChange={(_, newValue) => {
                  setSelectedUser(newValue);
                  if (!newValue) {
                    const initialValues = generateInitialValues();
                    Object.entries(initialValues).forEach(([key, value]) => {
                      setFieldValue(key, value);
                    });
                  } else {
                    handleUserChange(_, newValue);
                  }
                }}
                options={usersData?.data || []}
                getOptionLabel={(option) => option?.name || ""}
                loading={isLoadingUsers}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Select User"
                    error={touched.userId && Boolean(errors.userId)}
                    helperText={touched.userId && errors.userId}
                  />
                )}
              />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Form onSubmit={handleSubmit}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Actions</Typography>
                    </TableCell>
                    {actions.map((action, index) => (
                      <TableCell key={action}>
                        <Box className="flex items-center gap-x-2">
                          <span className="flex items-center justify-center p-2 text-white bg-gray-400 rounded-full size-6">
                            {index + 1}
                          </span>
                          <Typography>{action}</Typography>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissions.map(({ category, items }) => (
                    <React.Fragment key={category}>
                      {/* Category Header */}
                      <TableRow className="bg-pink-100">
                        <TableCell>
                          <Typography fontWeight="bold">{category}</Typography>
                        </TableCell>
                        {actions.map((action) => (
                          <TableCell key={action}>
                            <Box className="flex items-center gap-1">
                              <Checkbox
                                checked={isAllSelected(category, action)}
                                onChange={(e) =>
                                  toggleAll(category, action, e.target.checked)
                                }
                                disabled={items.length === 0}
                              />
                              <Typography>All</Typography>
                            </Box>
                          </TableCell>
                        ))}
                      </TableRow>
                      {/* Individual Permissions */}
                      {items.map((item) => {
                        const key = `${category}_${item.replace(/\s+/g, "")}`;
                        return (
                          <TableRow key={item}>
                            <TableCell>
                              <Typography sx={{ pl: 2 }}>{item}</Typography>
                            </TableCell>
                            {actions.map((action) => (
                              <TableCell key={action}>
                                <Checkbox
                                  checked={
                                    values[key]?.[action.toLowerCase()] ?? false
                                  }
                                  onChange={(e) =>
                                    setFieldValue(
                                      `${key}.${action.toLowerCase()}`,
                                      e.target.checked
                                    )
                                  }
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              <Box className="flex items-center justify-end mt-6 gap-x-4">
                <CustomButton
                  variant="contained"
                  backgroundColor="white"
                  textColor="black"
                  size="medium"
                  type="button"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  disabled={Boolean(selectedUser)}
                  type="submit"
                  variant="contained"
                  size="medium"
                >
                  Submit
                </CustomButton>
              </Box>
            </Form>
          </CardContent>
        </Card>
      </FormikProvider>
    </Stack>
  );
};

export default PermissionsTable;
