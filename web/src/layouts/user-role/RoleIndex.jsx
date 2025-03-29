import DynamicTab from "@/components/DynamicTab";
import Heading from "@/components/Heading";
import { Stack } from "@mui/material";
import { useState } from "react";
import { rolesTabOption } from "./components/roleObj";
import { useCallback } from "react";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import DynamicDrawer from "@/components/DynamicDrawer";
import UserCustomForm from "./components/UserCustomForm";
import RoleConfiguration from "./components/RoleConfiguration";

const RoleIndex = () => {
  const [value, setValue] = useState("usersList");
  const handleTabChange = useCallback((state) => setValue(state), []);
  const table = {
    columns: [
      { accessorKey: "id", header: "User ID" },
      { accessorKey: "name", header: "name" },
      { accessorKey: "email", header: "email" },
      { accessorKey: "password", header: "password" },
      { accessorKey: "role", header: "role" },
      { accessorKey: "created", header: "created date" },
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
        action: <Action />,
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
  };
  const [drawerOpen, setDrawer] = useState(false);
  const handleOpen = useCallback(() => setDrawer(true), []);
  const handleClose = useCallback(() => setDrawer(false), []);

  return (
    <Stack>
      <Heading title="User Roles" />
      <DynamicTab
        value={value}
        handleTabChange={handleTabChange}
        tabOption={rolesTabOption}
      />
      <Stack py={3}>
        {value === "usersList" ? (
          <DataTable filter={true} columns={table?.columns} data={table.data}>
            <CustomButton
              onClick={handleOpen}
              startIcon={<Plus size={16} />}
              size="medium"
            >
              New User
            </CustomButton>
            <DynamicDrawer
              size="32rem"
              open={drawerOpen}
              onClose={handleClose}
              headerText="Create User"
            >
              <UserCustomForm />
            </DynamicDrawer>
          </DataTable>
        ) : (
          <RoleConfiguration />
        )}
      </Stack>
    </Stack>
  );
};

export default RoleIndex;
