import Heading from "@/components/Heading";
import { Stack } from "@mui/material";
import PermissionsTable from "./components/PermissionsTable";

const PermissionManagement = () => {
  return (
    <Stack>
      <Heading text="Permission Management" />
      <PermissionsTable />
    </Stack>
  );
};

export default PermissionManagement;
