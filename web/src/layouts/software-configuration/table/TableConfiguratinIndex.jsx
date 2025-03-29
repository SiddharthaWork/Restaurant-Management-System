/* eslint-disable react/prop-types */
import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import {
  useCreateReservationTypeMutation,
  useDeleteReservationTypeMutation,
  useGetAllReservationTypeQuery,
} from "@/redux/api/reservationApi";
import {
  useCreateFloorPlanMutation,
  useCreateTableMutation,
  useDeleteFloorPlanMutation,
  useDeleteTableMutation,
  useGetAllTablesQuery,
  useGetFloorPlansQuery,
} from "@/redux/api/tableApi";
import {
  Autocomplete,
  Button,
  DialogContent,
  Divider,
  FormLabel,
  IconButton,
  Stack,
  TextField
} from "@mui/material";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { memo, useMemo } from "react";
import { toast } from "react-toastify";
import SharedTable from "../components/SharedTables";
import { ActionButtons } from "../employee/EmployeeConfigurationIndex";

const TableConfigurationIndex = () => {
  const { data: table } = useGetAllTablesQuery();
  const [deleteTable] = useDeleteTableMutation();

  const { data: floorplan } = useGetFloorPlansQuery();
  const [
    createFloorplan,
    { isLoading: creatingFloorplan, isSuccess: floorplanSuccess },
  ] = useCreateFloorPlanMutation();
  const [deleteFloorplan] = useDeleteFloorPlanMutation();

  const { data: reservationType } = useGetAllReservationTypeQuery();
  const [
    createReservation,
    { isLoading: creatingReservation, isSuccess: reservationSuccess },
  ] = useCreateReservationTypeMutation();
  const [deleteReservation] = useDeleteReservationTypeMutation();

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );
  const tableData = useMemo(
    () =>
      table
        ? table?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                status={"checked"}
                id={item._id}
                onDelete={() => deleteFunction(item._id, "table")}
              />
            ),
          }))
        : [],
    [table]
  );
  const floorplanData = useMemo(
    () =>
      floorplan
        ? floorplan?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "floorplan")}
              />
            ),
          }))
        : [],
    [floorplan]
  );
  const reservationData = useMemo(
    () =>
      reservationType
        ? reservationType?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "reservation")}
              />
            ),
          }))
        : [],
    [reservationType]
  );

  const deleteFunction = async (id, type) => {
    try {
      let res;
      switch (type) {
        case "table":
          res = await deleteTable(id).unwrap();
          break;
        case "floorplan":
          res = await deleteFloorplan(id).unwrap();
          break;
        case "reservation":
          res = await deleteReservation(id).unwrap();
      }
      if (res.success) toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };
  const onFloorPlanSubmit = async (values) => {
    const result = values.floorplan.map((value) => ({ name: value }));
    try {
      const res = await createFloorplan(result).unwrap();
      if (res?.success) toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(err?.data?.message);
    }
  };
  const onReservationSubmit = async (values) => {
    const result = values.reservationType.map((value) => ({
      name: value,
    }));
    try {
      const res = await createReservation(result).unwrap();
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <Stack>
      <Heading text="Table" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <SharedTable
          dialogHeaderText="CREATE TABLE NUMBER"
          headerBtnText="Add New Table"
          headerText="Table Number"
          canSearch={false}
          customForm={<TableNumber />}
          table={{ columns, data: tableData }}
        />
        <SharedTable
          dialogHeaderText="ADD FLOOR PLAN"
          headerBtnText="Add New Floor"
          headerText="Floor Plan"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingFloorplan}
              success={floorplanSuccess}
              name="floorplan"
              initialValues={{ floorplan: [""] }}
              formlabel="Floor Plan"
              onSubmit={onFloorPlanSubmit}
            />
          }
          table={{ columns, data: floorplanData }}
        />
        <SharedTable
          dialogHeaderText="ADD RESERVATION TYPE"
          headerBtnText="Add New Type"
          headerText="Reservation Type"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingReservation}
              success={reservationSuccess}
              onSubmit={onReservationSubmit}
              name="reservationType"
              initialValues={{ reservationType: [""] }}
              formlabel="Reservation Type"
            />
          }
          table={{ columns, data: reservationData }}
        />
      </div>
    </Stack>
  );
};

export default TableConfigurationIndex;
const TableNumber = memo(({ name = "table", formlabel = "Table Number" }) => {
  const [createTable, isLoading] = useCreateTableMutation();
  const { data: floorplan } = useGetFloorPlansQuery();
  const formik = useFormik({
    initialValues: {
      table: [
        {
          floorplan: null,
          name: "",
          capacity: "",
        },
      ],
    },
    onSubmit: async (values) => {
      const result = values?.table?.map((item) => ({
        floorplan: item.floorplan._id || null,
        name: item.name,
        capacity: item.capacity,
      }));
      console.log("result", result);
      try {
        const res = await createTable(result).unwrap();
        if (res?.success) {
          toast.success(res?.message);
          resetForm();
        }
      } catch (err) {
        console.log(err);
        toast.success("Something went wrong");
      }
    },
  });
  const { getFieldProps, values, handleSubmit, resetForm } = formik;

  return (
    <DialogContent>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FieldArray
              name={name}
              render={(arrayHelpers) => (
                <div className="grid space-y-2">
                  {values.table.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2">
                      <div className="col-span-11">
                        <FormLabel>Floor Plan</FormLabel>
                        <div className="flex gap-2">
                          <Autocomplete
                            fullWidth
                            size="small"
                            options={floorplan?.data || []} //
                            getOptionLabel={(option) => option.name || ""}
                            value={values.table[index].floorplan || null}
                            onChange={(event, value) => {
                              formik.setFieldValue(
                                `table.${index}.floorplan`,
                                value || null
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                placeholder="Select Floorplan"
                                error={
                                  formik.touched.table?.[index]?.floorplan &&
                                  !!formik.errors.table?.[index]?.floorplan
                                }
                                helperText={
                                  formik.touched.table?.[index]?.floorplan &&
                                  formik.errors.table?.[index]?.floorplan
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-span-9">
                        <FormLabel>{formlabel}</FormLabel>
                        <div className="flex gap-2">
                          <TextField
                            placeholder={`Enter ${formlabel}`}
                            className="w-full"
                            size="small"
                            {...getFieldProps(`table.${index}.name`)}
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <FormLabel>Pax</FormLabel>
                        <TextField
                          placeholder="0"
                          {...getFieldProps(`table.${index}.capacity`)}
                          className="w-full"
                          size="small"
                        />
                      </div>
                      {index > 0 && (
                        <div className="flex items-end justify-center w-full h-full col-span-1">
                          <IconButton
                            color="error"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </IconButton>
                        </div>
                      )}
                      <Divider />
                    </div>
                  ))}
                  <div className="">
                    <CustomButton
                      size="small"
                      type="button"
                      backgroundColor="orange"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          capacity: "",
                        })
                      }
                      variant="contained"
                    >
                      <Plus size={16} />
                      Add More
                    </CustomButton>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="flex justify-center py-4">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </DialogContent>
  );
});

TableNumber.displayName = "TableNumber";
