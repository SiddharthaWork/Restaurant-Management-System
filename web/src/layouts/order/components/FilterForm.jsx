import CustomButton from "@/components/CustomButton";
import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { FormikProvider, useFormik } from "formik";

const FilterForm = () => {
  const formik = useFormik({
    initialValues: {},
  });
  const { getFieldProps, setFieldValue } = formik;
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2">
          {formObj?.map((item) =>
            item?.type === "text" ? (
              <div key={item?.name} className="col-span-12 md:col-span-6">
                <FormLabel>{item?.label}</FormLabel>
                <TextField
                  size="small"
                  fullWidth
                  name={item?.name}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  {...getFieldProps(item?.name)}
                />
              </div>
            ) : (
              <div key={item?.name} className="col-span-12 md:col-span-6">
                <FormLabel>{item?.label}</FormLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    value={formik.values[item?.name]}
                    options={item?.options}
                    onChange={(e, nv) => setFieldValue(item?.name, nv || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={item?.placeholder}
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </div>
            )
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <CustomButton backgroundColor="#DDE2E8" textColor="black">Reset</CustomButton>
          <CustomButton >Apply</CustomButton>
        </div>
      </form>
    </FormikProvider>
  );
};

export default FilterForm;
const formObj = [
  {
    type: "text",
    label: "Order Number",
    name: "orderNumber",
    placeholder: "fresh",
  },
  { type: "text", label: "Item Name", name: "itemName", placeholder: "fresh" },
  {
    type: "dropdown",
    label: "Status",
    name: "status",
    options: ["a", "b"],
    placeholder: "Available",
  },
  {
    type: "text",
    label: "Keyword Search",
    name: "search",
    placeholder: "Search",
  },
  {
    type: "dropdown",
    label: "Server",
    name: "server",
    options: ["a", "b"],
    placeholder: "Select server",
  },
  { type: "text", label: "Order type", name: "orderType", placeholder: "Type" },
];
