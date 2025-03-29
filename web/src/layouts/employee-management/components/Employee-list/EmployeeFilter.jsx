/* eslint-disable react/prop-types */
import CustomButton from "@/components/CustomButton";
import { FilterDialog } from "@/components/FilterDialogForm";
import {
  Autocomplete,
  FormControl,
  FormLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { employeeFilter } from "../employeeObj";

const EmployeeFilter = ({ open, onClose }) => {
  const initialValues = {
    employeeId: "",
    employeeName: "",
    department: "",
    role: "",
    time: { from: "", to: "" },
    shift: "",
  };

  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required("Employee ID is required"),
    employeeName: Yup.string().required("Employee Name is required"),
    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),
    time: Yup.object().shape({
      from: Yup.string(),
      to: Yup.string(),
    }),
    shift: Yup.string().required("Shift is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  const { setFieldValue, getFieldProps, values } = formik;
  return (
    <FormikProvider value={formik}>
      <FilterDialog open={open} onClose={onClose}>
        <FormikProvider value={formik}>
          <Form>
            <div className="grid-cols-2 gap-2  grid">
              {employeeFilter.map(
                ({ label, name, type, options, placeholder }) =>
                  type === "dropdown" ? (
                    <FormControl key={name} className="w-full mb-4">
                      <FormLabel>{label}</FormLabel>
                      <Autocomplete
                        size="small"
                        onChange={(_, newValue) =>
                          setFieldValue(name, newValue ? newValue.value : "")
                        }
                        value={values[name] || null}
                        options={options || []}
                        getOptionLabel={(option) => option?.label || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={placeholder}
                            {...getFieldProps(name)}
                          />
                        )}
                      />
                    </FormControl>
                  ) : type === "split" ? (
                    <div key="split" className="space-y-1">
                      <div>
                        <FormLabel>Time</FormLabel>
                      </div>
                      <div className="w-full grid grid-cols-5">
                        <TextField
                          className="col-span-2"
                          size="small"
                          name="price.from"
                          placeholder="From"
                          value={formik.values.time.from}
                          {...getFieldProps("time.from")}
                        />
                        <p className="flex items-center justify-center">-</p>
                        <TextField
                          fullWidth
                          className="col-span-2"
                          name="price.to"
                          placeholder="To"
                          size="small"
                          value={formik.values.time.to}
                          {...getFieldProps("time.to")}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 space-y-2" key={name}>
                      <InputLabel>{label}</InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        {...getFieldProps(name)}
                        error={
                          formik.touched[name] && Boolean(formik.errors[name])
                        }
                        helperText={formik.touched[name] && formik.errors[name]}
                      />
                    </div>
                  )
              )}
            </div>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              py={2}
            >
              <CustomButton
                type="button"
                backgroundColor="#DDE2E8"
                textColor="blackI"
              >
                Reset
              </CustomButton>
              <CustomButton type="submit">Apply</CustomButton>
            </Stack>
          </Form>
        </FormikProvider>
      </FilterDialog>
    </FormikProvider>
  );
};

export default EmployeeFilter;
