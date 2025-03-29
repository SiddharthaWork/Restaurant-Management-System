import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import {
  Autocomplete,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";
import { useMemo } from "react";
import WasteCustomForm from "./components/WasteCustomForm";
import { Form, FormikProvider, useFormik } from "formik";
import { FilterDialog } from "@/components/FilterDialogForm";
import { wasteFilterFormData } from "./components/wasteObj";

const WasteIndex = () => {
  const [openAddFormDialog, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const table = useMemo(
    () => ({
      columns: [
        { accessorKey: "id", header: "Waste Id" },
        { accessorKey: "date", header: "Date" },
        { accessorKey: "category", header: "Category" },
        { accessorKey: "source", header: "Source of Waste" },
        { accessorKey: "menu", header: "Food Menu" },
        { accessorKey: "type", header: "Waste Type" },
        { accessorKey: "estimation", header: "Cost Estimation" },
        { accessorKey: "quantity", header: "Food Waste Quantity" },
        { accessorKey: "action", header: "Action" },
      ],
      data: [
        {
          id: 1,
          date: "2024-1-12",
          category: "Meat",
          source: "Dinning Area",
          menu: "BreakFast",
          type: "Food Waste",
          estimation: 2500,
          quantity: "3 kg",
          action: <Action onViewClick={() => {}} />,
        },
      ],
    }),
    []
  );
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const openFilterDialog = useCallback(() => setOpenFilter(true), []);
  const closeFilterDialog = useCallback(() => setOpenFilter(false), []);
  const formik = useFormik({
    initialValues: {
      category: "",
      quantity: {
        min: "",
        max: "",
      },
      status: "",
      vendor: "",
      date: "",
      type: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { getFieldProps, values, setFieldValue, resetForm, handleSubmit } =
    formik;

  return (
    <>
      <Heading text="Waste Management" />
      <Stack>
        <DataTable
          columns={table?.columns}
          data={table?.data}
          csv={true}
          download={true}
          print={true}
          filter={true}
          filterFunction={openFilterDialog}
        >
          <CustomButton onClick={handleOpen} startIcon={<Plus size={16} />}>
            Add Item
          </CustomButton>
        </DataTable>
        <WasteCustomForm open={openAddFormDialog} onClose={handleClose} />
        <FilterDialog open={openFilter} onClose={closeFilterDialog}>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                {wasteFilterFormData.map(
                  ({ label, type, placeholder, options, name }) =>
                    type === "dropdown" ? (
                      <div className="col-span-6" key={name}>
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
                    ) : type === "split" ? (
                      <div key='og' className="col-span-12 sm:col-span-6">
                        <FormLabel>QTY</FormLabel>
                        <div className="grid w-full grid-cols-5">
                          <TextField
                            name="quantity.min"
                            type="number"
                            value={values.quantity.min || ""}
                            size="small"
                            placeholder="Min"
                            fullWidth
                            {...getFieldProps("quantity.min")}
                            className="col-span-2"
                          />
                          <p className="flex items-center justify-center w-full">
                            -
                          </p>
                          <TextField
                            name="quantity.max"
                            type="number"
                            size="small"
                            value={values.quantity.max || ""}
                            placeholder="Max"
                            fullWidth
                            {...getFieldProps("quantity.max")}
                            className="col-span-2"
                          />
                        </div>
                      </div>
                    ) : (
                      <div key={name} className="col-span-12 sm:col-span-6">
                        <FormLabel>{label}</FormLabel>
                        <TextField
                          name={name}
                          type={type}
                          value={values[name] || ""}
                          size="small"
                          fullWidth
                          {...getFieldProps("due.from")}
                          className="col-span-2"
                        />
                      </div>
                    )
                )}
              </div>
              <div className="flex justify-between pt-4">
                <CustomButton
                  type="button"
                  onClick={() => resetForm()}
                  backgroundColor="#DDE2E8"
                  textColor="black"
                >
                  Reset
                </CustomButton>
                <CustomButton type="submit">Apply</CustomButton>
              </div>
            </Form>
          </FormikProvider>
        </FilterDialog>
      </Stack>
    </>
  );
};

export default WasteIndex;
