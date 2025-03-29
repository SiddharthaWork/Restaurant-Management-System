/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { creditFormObj } from "./employeeObj";
import CustomButton from "@/components/CustomButton";
import { memo } from "react";

export const FormField = ({ Icon, label }) => (
  <Stack direction="row" py={1} className="items-center" gap={2}>
    <Icon />
    <Typography variant="h6" fontWeight="bold" fontSize="1.2rem">
      {label}
    </Typography>
  </Stack>
);

const CreditCustomForm = memo(() => {
  const initialValues = creditFormObj.reduce((acc, field) => {
    if (field.name) {
      acc[field.name] = "";
    }
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, setFieldValue, values, getFieldProps, resetForm } =
    formik;

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
        return <Divider />;

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
    <div className="max-w-lg p-4">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} className="space-y-4">
          {creditFormObj?.map(renderFormField)}
          <div className="flex items-center justify-center pt-4 gap-x-4">
            <CustomButton type="submit">Save</CustomButton>
            <CustomButton
              textColor="black"
              backgroundColor="#DDE2E8"
              type="button"
              onClick={() => resetForm()}
            >
              Reset
            </CustomButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
});
CreditCustomForm.displayName = "CreditCustomForm";

export default CreditCustomForm;
