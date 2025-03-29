import CustomButton from "@/components/CustomButton";
import DynamicDrawer from "@/components/DynamicDrawer";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCallback } from "react";
import { memo } from "react";
import { useMemo } from "react";
import CreditCustomForm from "./CreditCustomForm";
import { FilterDialog } from "@/components/FilterDialogForm";
import { Form, FormikProvider, useFormik } from "formik";
import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { employeeFilterForm } from "./employeeObj";

const EmployeeCredit = memo(() => {
  const table = useMemo(
    () => ({
      columns: [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Dish Name" },
        { accessorKey: "category", header: "Category" },
        { accessorKey: "cost", header: "Total Cost" },
        { accessorKey: "sp", header: "Selling Price" },
        { accessorKey: "profit", header: "Profit Margin" },
        { accessorKey: "action", header: "Action" },
      ],
      data: [
        {
          id: 1,
          name: "Spaghetti Carbonara",
          category: "Pasta",
          cost: 5.0,
          sp: 12.0,
          profit: 7.0,
          action: <Action onViewClick={() => {}} />,
        },
        {
          id: 2,
          name: "Margherita Pizza",
          category: "Pizza",
          cost: 4.5,
          sp: 10.0,
          profit: 5.5,
          action: <Action />,
        },
        {
          id: 3,
          name: "Caesar Salad",
          category: "Salad",
          cost: 3.0,
          sp: 8.0,
          profit: 5.0,
          action: <Action />,
        },
        {
          id: 4,
          name: "Grilled Salmon",
          category: "Seafood",
          cost: 8.0,
          sp: 20.0,
          profit: 12.0,
          action: <Action />,
        },
        {
          id: 5,
          name: "Chocolate Lava Cake",
          category: "Dessert",
          cost: 2.5,
          sp: 6.0,
          profit: 3.5,
          action: <Action />,
        },
      ],
    }),
    []
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const openHandler = useCallback(() => setOpenDrawer(true), []);
  const closeHandler = useCallback(() => setOpenDrawer(false), []);
  const openDialogHandler = useCallback(() => setOpenDialog(true), []);
  const closeDialogHandler = useCallback(() => setOpenDialog(false), []);
  const creditCustomForm = useMemo(() => <CreditCustomForm />, []);
  const formik = useFormik({
    initialValues: {
      employeeName: "",
      price: {
        min: "",
        max: "",
      },
      repaymentMethod: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { getFieldProps, setFieldValue, values, resetForm, handleSubmit } =
    formik;
  return (
    <>
      <DataTable
        csv={true}
        download={true}
        print={true}
        filter={true}
        datePicker={true}
        columns={table?.columns}
        data={table?.data}
        filterFunction={openDialogHandler}
      >
        <CustomButton
          onClick={openHandler}
          size="large"
          startIcon={<Plus size={16} />}
        >
          New Credit
        </CustomButton>
      </DataTable>
      <DynamicDrawer
        open={openDrawer}
        size={512}
        headerText="Manage Employee Credit"
        onClose={closeHandler}
      >
        {creditCustomForm}
      </DynamicDrawer>
      <FilterDialog open={openDialog} onClose={closeDialogHandler}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-y-5 gap-x-4">
              {employeeFilterForm.map(
                ({ label, type, placeholder, options, name }) =>
                  type === "dropdown" ? (
                    <div className="col-span-6 space-y-1" key={name}>
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
                    <div
                      key="og"
                      className="col-span-12 space-y-1 sm:col-span-6"
                    >
                      <FormLabel>Price</FormLabel>
                      <div className="grid w-full grid-cols-5">
                        <TextField
                          name="price.min"
                          type="number"
                          value={values.price.min || ""}
                          size="small"
                          placeholder="Min"
                          fullWidth
                          {...getFieldProps("price.min")}
                          className="col-span-2"
                        />
                        <p className="flex items-center justify-center w-full">
                          -
                        </p>
                        <TextField
                          name="price.max"
                          type="number"
                          size="small"
                          value={values.price.max || ""}
                          placeholder="Max"
                          fullWidth
                          {...getFieldProps("price.max")}
                          className="col-span-2"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      key={name}
                      className="col-span-12 space-y-1 sm:col-span-6"
                    >
                      <FormLabel>{label}</FormLabel>
                      <TextField
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={values[name] || ""}
                        size="small"
                        fullWidth
                        {...getFieldProps(name)}
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
    </>
  );
});
EmployeeCredit.displayName = "EmployeeCredit";
export default EmployeeCredit;
