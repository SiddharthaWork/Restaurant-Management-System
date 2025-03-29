/* eslint-disable react/prop-types */
import { Form, FormikProvider, useFormik } from "formik";
import DialogHeader from "../../table-reservation/components/DialogHeader";
import { wasteCustomFormData } from "./wasteObj";
import {
  Autocomplete,
  Button,
  DialogContent,
  FormControl,
  FormLabel,
  InputLabel,
  TextField,
} from "@mui/material";

const WasteCustomForm = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      date: "",
      category: "",
      source: "",
      menu: "",
      type: "",
      estimation: "",
      quantity: "",
      productType: "",
      reason: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { values, getFieldProps, setFieldValue, handleSubmit } = formik;
  return (
    <DialogHeader
      headerText="Waste Entry"
      size="lg"
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-12 gap-4">
              {wasteCustomFormData?.map(
                ({ name, type, label, placeholder, options }) =>
                  type === "dropdown" ? (
                    <div className="col-span-4" key={name}>
                      <FormLabel>{label}</FormLabel>
                      <FormControl className="w-full">
                        <Autocomplete
                          size="small"
                          onChange={(_, nv) =>
                            setFieldValue(name, nv ? nv.value : "")
                          }
                          name={name}
                          value={
                            values[name]
                              ? options?.find(
                                  (item) => item?.value === values[name]
                                ) || null
                              : null 
                          }
                          getOptionLabel={(option) => option?.label}
                          options={options}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              placeholder={placeholder}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  ) : (
                    <div className="col-span-4" key={name}>
                      <InputLabel>{label}</InputLabel>
                      <TextField
                        fullWidth
                        size="small"
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={values[name]}
                        {...getFieldProps(name)}
                      />
                    </div>
                  )
              )}
            </div>
            <div className="flex justify-end pt-6">
              <Button type="submit" variant="contained">
                submit
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </DialogContent>
    </DialogHeader>
  );
};

export default WasteCustomForm;
