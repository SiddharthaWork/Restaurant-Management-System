import Heading from "@/components/Heading";
import { Box, IconButton, Stack, Switch } from "@mui/material";
import SharedTable from "../components/SharedTables";
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import {
  useCreateWasteSourceMutation,
  useCreateWasteTypeMutation,
  useDeleteWasteSourceMutation,
  useDeleteWasteTypeMutation,
  useGetAllWasteSourceQuery,
  useGetAllWasteTypeQuery,
} from "@/redux/api/wasteApi";
import { ActionButtons } from "../employee/EmployeeConfigurationIndex";
import { toast } from "react-toastify";

const WasteConfigurationIndex = () => {
  const { data: wasteSource } = useGetAllWasteSourceQuery();
  const [
    createWasteSource,
    { isLoading: creatingSource, isSuccess: sourceSuccess },
  ] = useCreateWasteSourceMutation();
  const [deleteWasteSource] = useDeleteWasteSourceMutation();
  const { data: wasteType } = useGetAllWasteTypeQuery();
  const [createWasteType, { isLoading: creatingType, isSuccess: typeSuccess }] =
    useCreateWasteTypeMutation();
  const [deleteWasteType] = useDeleteWasteTypeMutation();

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );

  const wasteSourceData = useMemo(
    () =>
      wasteSource
        ? wasteSource?.data.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "source")}
              />
            ),
          }))
        : [],
    [wasteSource]
  );
  const wasteTypeData = useMemo(
    () =>
      wasteType
        ? wasteType?.data.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "type")}
              />
            ),
          }))
        : [],
    [wasteType]
  );
  const onSubmitWasteSource = async (values) => {
    const result = values?.source?.map((item) => ({ name: item }));
    try {
      const res = await createWasteSource(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const onSubmitWasteType = async (values) => {
    const result = values?.wasteType?.map((item) => ({ name: item }));
    try {
      const res = await createWasteType(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const deleteFunction = async (id, type) => {
    try {
      let res;
      switch (type) {
        case "source":
          res = await deleteWasteSource(id).unwrap();
          break;
        case "type":
          res = await deleteWasteType(id).unwrap();
          break;
        case "position":
          // res = await deletePosition(id).unwrap();
          break;
      }
      if (res.success) toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack>
      <Heading text="Menu" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <SharedTable
          dialogHeaderText="CREATE SOURCE OF WASTE"
          headerBtnText="Add New Source"
          headerText="Source of Waste"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              name="source"
              loading={creatingSource}
              success={sourceSuccess}
              onSubmit={onSubmitWasteSource}
              initialValues={{ source: [""] }}
              formlabel="Source of Waste"
            />
          }
          table={{ columns, data: wasteSourceData }}
        />
        <SharedTable
          dialogHeaderText="CREATE WASTE TYPE"
          headerBtnText="Add New Type"
          headerText="Waste Type"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingType}
              success={typeSuccess}
              onSubmit={onSubmitWasteType}
              name="wasteType"
              initialValues={{ wasteType: [""] }}
              formlabel="Waste Type"
            />
          }
          table={{ columns, data: wasteTypeData }}
        />
        <SharedTable
          dialogHeaderText="CREATE WASTE CATEGORY"
          headerBtnText="Add New CATEGORY"
          headerText="Waste Category"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              name="category"
              initialValues={{ category: [""] }}
              formlabel="Waste Category"
            />
          }
          table={{ columns, data: [] }}
        />
      </div>
    </Stack>
  );
};

export default WasteConfigurationIndex;
