import CustomButton from "@/components/CustomButton";
import DynamicTab from "@/components/DynamicTab";
import { FilterDialog } from "@/components/FilterDialogForm";
import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { FormLabel, Stack, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import SharedTable from "../software-configuration/components/SharedTables";
import { CreateNecessaryForm } from "../user-role/components/RoleConfiguration";
import { Action } from "@/components/TableAction";

const CounterIndex = () => {
  const [value, setValue] = useState("history");
  const [openFilter, setOpenFilter] = useState(false);
  const openFilterDialog = useCallback(() => setOpenFilter(true), []);
  const closeFilterDialog = useCallback(() => setOpenFilter(false), []);
  const tabOptions = [
    {
      label: "Counter History",
      value: "history",
    },
    {
      value: "configuration",
      label: "Counters Configuration",
    },
  ];
  const handleTabChange = useCallback((state) => setValue(state), []);
  const table = useMemo(
    () => ({
      columns: [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Counter Name" },
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
  const formik = useFormik({
    initialValues: {
      user: "",
      due: {
        from: "",
        to: "",
      },
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { getFieldProps, values, resetForm, handleSubmit } = formik;
  return (
    <>
      <Heading text="Counter" />
      <DynamicTab
        tabOption={tabOptions}
        handleTabChange={handleTabChange}
        value={value}
      />

      <Stack py={2}>
        {value === "history" ? (
          <DataTable
            columns={table?.columns}
            data={table?.data}
            print={true}
            csv={true}
            filter={true}
            download={true}
            filterFunction={openFilterDialog}
          />
        ) : (
          <div className="grid xl:grid-cols-2">
            <SharedTable
              headerText="Counter Type"
              headerBtnText="Add New Counter"
              dialogHeaderText="CREATE COUNTER"
              canSearch={false}
              customForm={
                <CreateNecessaryForm
                  name="counterName"
                  initialValues={{ counterName: [""] }}
                  formlabel="Counter Name"
                />
              }
              table={table}
            />
          </div>
        )}
        <FilterDialog open={openFilter} onClose={closeFilterDialog}>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-x-4">
                <div className="col-span-12 sm:col-span-6">
                  <FormLabel>Search By User</FormLabel>
                  <TextField
                    name="user"
                    fullWidth
                    value={values.user || ""}
                    size="small"
                    placeholder="User Name"
                    {...getFieldProps("user")}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <FormLabel>Search By User</FormLabel>
                  <div className="grid w-full grid-cols-5">
                    <TextField
                      name="due.from"
                      value={values.due.from || ""}
                      size="small"
                      placeholder="From"
                      fullWidth
                      {...getFieldProps("due.from")}
                      className="col-span-2"
                    />
                    <p className="flex items-center justify-center w-full">-</p>
                    <TextField
                      name="due.to"
                      size="small"
                      value={values.due.to || ""}
                      placeholder="To"
                      fullWidth
                      {...getFieldProps("due.to")}
                      className="col-span-2"
                    />
                  </div>
                </div>
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

export default CounterIndex;
