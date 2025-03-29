/* eslint-disable react/prop-types */
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import {
  useCreateVendorBusinessMutation,
  useDeleteVendorBusinessMutation,
  useGetAllVendorBusinessQuery,
} from "@/redux/api/vendorApi";
import { Box, IconButton, Switch } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import SharedTable from "../components/SharedTables";

const VendorConfigurationIndex = () => {
  const { data: vendorData } = useGetAllVendorBusinessQuery();
  const [createVendorBusinessType] = useCreateVendorBusinessMutation();
  const [deleteVendorBusinessType] = useDeleteVendorBusinessMutation();

  const deleteBusiness = useCallback(
    async (id) => {
      console.log(id);
      try {
        const res = await deleteVendorBusinessType(id).unwrap();
        if (res?.success) {
          toast.success(res?.message);
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete business type.");
        console.error(error);
      }
    },
    [deleteVendorBusinessType]
  );

  const tableData = useMemo(
    () =>
      vendorData?.data?.map((vendor) => ({
        id: vendor._id,
        type: vendor.name,
        action: (
          <ActionButtons
            vendorId={vendor._id}
            status={vendor.isActive}
            onDelete={deleteBusiness}
          />
        ),
      })) || [],
    [vendorData, deleteBusiness]
  );

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );

  const onSubmit = async (values) => {
    const result = values?.name?.map((value) => ({ name: value }));
    console.log(result);
    try {
      const res = await createVendorBusinessType(result).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create business type.");
      console.error(err);
    }
  };
  console.log(vendorData);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <SharedTable
          table={{ columns, data: tableData }}
          customForm={
            <CreateNecessaryForm
              name="name"
              initialValues={{ name: [""] }}
              formlabel="Business Type"
              onSubmit={onSubmit}
            />
          }
          dialogHeaderText="Create Business Type"
          headerBtnText="Add New Type"
          headerText="Business Type"
        />
      </div>
    </div>
  );
};

const ActionButtons = ({ vendorId, status, onDelete }) => {
  return (
    <Box className="flex items-center gap-2">
      <Switch size="small" checked={Boolean(status)} />
      <IconButton size="small" className="text-gray-600">
        <Edit className="w-4 h-4" />
      </IconButton>
      <IconButton
        size="small"
        className="text-gray-600"
        onClick={() => onDelete(vendorId)}
      >
        <Trash2 className="w-4 h-4" />
      </IconButton>
    </Box>
  );
};

export default VendorConfigurationIndex;
