import CustomButton from "@/components/CustomButton";
import { Autocomplete, FormLabel, Stack, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";

const FilterForm = () => {
  const formik = useFormik({
    initialValues: {
      category: "",
      price: {
        min: "",
        max: "",
      },
      status: "",
      itemName: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { values, resetForm, handleSubmit, getFieldProps, setFieldValue } =
    formik;
  console.log(values);
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-3">
          <div className="col-span-6">
            <div>
              <FormLabel>Category</FormLabel>
            </div>
            <TextField
              fullWidth
              placeholder="fresh"
              name="category"
              size="small"
              value={values.category}
              {...getFieldProps("category")}
            />
          </div>
          <div className="col-span-6">
            <div>
              <FormLabel>Price</FormLabel>
            </div>
            <div className="grid grid-cols-5">
              <TextField
                className="col-span-2"
                size="small"
                name="price.min"
                placeholder="Min"
                value={formik.values.price.min}
                {...getFieldProps("price.min")}
              />
              <p className="flex items-center justify-center">-</p>
              <TextField
                fullWidth
                className="col-span-2"
                name="price.max"
                placeholder="Max"
                size="small"
                value={formik.values.price.min}
                {...getFieldProps("price.max")}
              />
            </div>
          </div>
          <div className="col-span-6">
            <FormLabel>Status</FormLabel>
            <Autocomplete
              size="small"
              name="status"
              value={formik.values.status}
              options={["On", "Off"]}
              onChange={(event, nv) => setFieldValue("status", nv || "")}
              renderInput={(params) => (
                <TextField size="small" {...params} placeholder="On" />
              )}
            />
          </div>
          <div className="col-span-6">
            <div>
              <FormLabel>Item Name</FormLabel>
            </div>
            <TextField
              fullWidth
              size="small"
              name="itemName"
              value={values.itemName}
              placeholder="Enter Item Name"
              {...getFieldProps("itemName")}
            />
          </div>
        </div>
        <Stack direction="row" className="justify-between mt-4">
          <CustomButton
            size="small"
            backgroundColor="#DDE2E8"
            textColor="black"
            onClick={() => resetForm()}
          >
            Reset
          </CustomButton>
          <CustomButton size="small" type="submit">
            Apply Now
          </CustomButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default FilterForm;
