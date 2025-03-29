/* eslint-disable react/prop-types */
import CustomButton from "@/components/CustomButton";
import DialogHeader from "@/layouts/table-reservation/components/DialogHeader";
import {
  Box,
  Checkbox,
  DialogContent,
  FormLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { Edit, Plus, Trash2 } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
("");
const RoleConfiguration = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const initialRoles = [
    { id: "01", name: "Counter", enabled: true },
    { id: "02", name: "Admin", enabled: true },
    { id: "02", name: "Waiter App", enabled: true },
    { id: "02", name: "Manager", enabled: true },
  ];

  const formik = useFormik({
    initialValues: {
      roles: initialRoles,
      selectedRoles: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleToggle = (index) => {
    const newRoles = [...formik.values.roles];
    newRoles[index].enabled = !newRoles[index].enabled;
    formik.setFieldValue("roles", newRoles);
  };

  const handleDelete = (index) => {
    const newRoles = formik.values.roles.filter((_, i) => i !== index);
    formik.setFieldValue("roles", newRoles);
  };
  const handleOpen = useCallback(() => setOpenDialog(true), []);
  const handleClose = useCallback(() => setOpenDialog(false), []);
  return (
    <Paper className="p-6 rounded-lg shadow-sm xl:w-[60%]">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="text-teal-500">
          Role Configuration
        </Typography>
        <Box className="flex items-center gap-2">
          <CustomButton
            onClick={handleOpen}
            variant="contained"
            size="small"
            startIcon={<Plus size={16} />}
          >
            Add New Role
          </CustomButton>

          <Switch />
          <DialogHeader
            open={openDialog}
            headerText="CREATE ROLE"
            onClose={handleClose}
          >
            <CreateNecessaryForm name="role" />
          </DialogHeader>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead className="bg-teal-50">
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? formik.values.roles.map((_, index) => index)
                      : [];
                    formik.setFieldValue("selectedRoles", newSelected);
                  }}
                />
              </TableCell>
              <TableCell className="font-semibold">#</TableCell>
              <TableCell className="font-semibold">Role</TableCell>
              <TableCell className="font-semibold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formik.values.roles.map((role, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={formik.values.selectedRoles.includes(index)}
                    onChange={(e) => {
                      const newSelected = [...formik.values.selectedRoles];
                      if (e.target.checked) {
                        newSelected.push(index);
                      } else {
                        const idx = newSelected.indexOf(index);
                        newSelected.splice(idx, 1);
                      }
                      formik.setFieldValue("selectedRoles", newSelected);
                    }}
                  />
                </TableCell>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <Box className="flex items-center gap-2">
                    <Switch
                      size="small"
                      checked={role.enabled}
                      onChange={() => handleToggle(index)}
                    />
                    <IconButton
                      size="small"
                      className="text-gray-600"
                      onClick={() => console.log("Edit role", role)}
                    >
                      <Edit className="w-4 h-4" />
                    </IconButton>
                    <IconButton
                      size="small"
                      className="text-gray-600"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RoleConfiguration;

export const CreateNecessaryForm = memo(
  ({
    loading,
    success,
    initialValues = { role: [""] },
    formlabel = "Role",
    name = "",
    onSubmit = (values) => console.log(values),
  }) => {
    useEffect(() => {
      if (success) resetForm();
    }, [success]);
    const formik = useFormik({
      initialValues,
      onSubmit,
    });
    const { getFieldProps, resetForm, values, handleSubmit } = formik;
    console.log(values);
    return (
      <DialogContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FieldArray
                name={name}
                render={(arrayHelpers) => (
                  <div className="space-y-2">
                    {formik.values[name].map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                          <FormLabel>{formlabel}</FormLabel>
                          <div className="flex gap-2">
                            <TextField
                              placeholder={`Enter ${formlabel}`}
                              fullWidth
                              size="small"
                              {...getFieldProps(`${name}.${index}`)}
                            />
                            {index > 0 && (
                              <IconButton
                                startIcon={<Trash2 size={16} />}
                                type="button"
                                backgroundColor="#ef4444"
                                color="error"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Trash2 size={18} />
                              </IconButton>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <CustomButton
                      startIcon={<Plus size={16} />}
                      type="button"
                      backgroundColor="orange"
                      textColor="white"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add More
                    </CustomButton>
                  </div>
                )}
              />
            </div>

            <Stack py={2} className="items-center justify-center">
              <CustomButton loading={loading}  variant="contained" color="primary" type="submit">
                Submit
              </CustomButton>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    );
  }
);
CreateNecessaryForm.displayName = "CreateNecessaryForm";
