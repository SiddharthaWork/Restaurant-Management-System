/* eslint-disable react/prop-types */
import DynamicDrawer from "@/components/DynamicDrawer";
import FileUploadDropzone from "@/components/FileDropZone";
import {
  Autocomplete,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { User } from "lucide-react";
import { FormField } from "../CreditCustomForm";
import { newEmployeeObj } from "../employeeObj";
import CustomButton from "@/components/CustomButton";

const EmployeeCustomForm = ({ open, onClose, headerText, title = "Add" }) => {
  const formik = useFormik({
    initialValues: {
      employeeName: "",
      number: "",
      email: "",
      address: "",
      dob: "",
      joinDate: "",
      department: "",
      position: "",
      shiftType: "",
      salary: "",
      paidLeave: "",
      gender: "",
      time: {
        from: "",
        to: "",
      },
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { values, setFieldValue, getFieldProps, handleSubmit } = formik;
  const renderFormField = (field) => {
    const {
      type,
      title,
      options,
      placeholder,
      name,
      icon: Icon,
      label,
      multiline,
      rows,
    } = field;

    switch (title) {
      case "heading":
        return <FormField key={label} Icon={Icon} label={label} />;

      case "divider":
        return (
          <Divider
            key={label}
            sx={{
              paddingY: 1,
            }}
          />
        );
      case "split":
        return (
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
        );
      case "radio":
        return (
          <FormControl key={name}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              name={name}
              value={values[name]}
              onChange={(e) => setFieldValue(name, e.target.value)}
            >
              <div className="flex items-center gap-2 ">
                {options?.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </div>
            </RadioGroup>
            {formik.touched[name] && formik.errors[name] && (
              <Typography color="error" variant="caption">
                {formik.errors[name]}
              </Typography>
            )}
          </FormControl>
        );
      case "dropdown":
        return (
          <div className="mb-4 space-y-2" key={name}>
            <FormLabel>{label}</FormLabel>
            <FormControl className="w-full">
              <Autocomplete
                size="small"
                onChange={(_, newValue) =>
                  setFieldValue(name, newValue ? newValue.value : "")
                }
                value={
                  values[name]
                    ? options?.find((item) => item?.value === values[name]) ||
                      null
                    : null
                }
                getOptionLabel={(option) => option?.label}
                options={options || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder={placeholder}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                  />
                )}
              />
            </FormControl>
          </div>
        );

      default:
        return (
          <div className="mb-4 space-y-2" key={name}>
            <InputLabel>{label}</InputLabel>
            <TextField
              multiline={multiline}
              rows={rows}
              fullWidth
              size="small"
              type={type}
              name={name}
              placeholder={placeholder}
              {...getFieldProps(name)}
              error={formik.touched[name] && Boolean(formik.errors[name])}
              helperText={formik.touched[name] && formik.errors[name]}
            />
          </div>
        );
    }
  };
  return (
    <DynamicDrawer
      headerText={headerText}
      size={512}
      open={open}
      onClose={onClose}
    >
      <div className="max-w-lg p-4">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            {newEmployeeObj.map((field) => renderFormField(field))}
            <Stack spacing={1}>
              <Stack direction="row" py={1} className="items-center" gap={2}>
                <User />
                <Typography variant="h6" fontWeight="bold" fontSize="1.2rem">
                  Documents
                </Typography>
              </Stack>
              <div className="space-y-1">
                <FormLabel>NationalId/Cititzenship ID</FormLabel>
                <FileUploadDropzone
                  name="nationalId"
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="space-y-1">
                <FormLabel>Passport Size Photo</FormLabel>
                <FileUploadDropzone
                  name="passportPhoto"
                  setFieldValue={setFieldValue}
                />
              </div>
            </Stack>
            <Stack direction="row" spacing={2} py={2} justifyContent="center">
              <CustomButton
                backgroundColor="#DDE2E8"
                textColor="black"
                onClick={onClose}
                type="button"
              >
                Cancel
              </CustomButton>
              <CustomButton type="submit">Save Employee</CustomButton>
            </Stack>
          </Form>
        </FormikProvider>
      </div>
    </DynamicDrawer>
  );
};

export default EmployeeCustomForm;
