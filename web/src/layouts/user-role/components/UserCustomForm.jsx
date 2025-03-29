import CustomButton from "@/components/CustomButton";
import { Autocomplete, FormLabel, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { userRoleFormObj, userYupSchema } from "./roleObj";

const UserCustomForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: userYupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    getFieldProps,
    setFieldValue,
    values,
    errors,
    touched,
    handleSubmit,
  } = formik;
  return (
    <div className="max-w-lg px-4 py-4">
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {userRoleFormObj?.map(
              ({ label, options, type, name, placeholder }) =>
                type === "dropdown" ? (
                  <div key={name} className="space-y-1">
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Autocomplete
                      id={name}
                      options={options}
                      value={
                        options.find(
                          (option) => option.value === values[name]
                        ) || null
                      }
                      onChange={(_, newValue) => {
                        setFieldValue(name, newValue ? newValue.value : "");
                      }}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder={placeholder}
                          size="small"
                          error={touched[name] && Boolean(errors[name])}
                          helperText={touched[name] && errors[name]}
                        />
                      )}
                    />
                  </div>
                ) : (
                  <div key={name} className="space-y-1">
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <TextField
                      fullWidth
                      name={name}
                      size="small"
                      type={type}
                      placeholder={placeholder}
                      value={values[name]}
                      id={name}
                      error={touched[name] && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                      {...getFieldProps(name)}
                    />
                  </div>
                )
            )}
          </div>
          <div className="flex justify-end pt-6">
            <CustomButton type="submit">Submit</CustomButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default UserCustomForm;
