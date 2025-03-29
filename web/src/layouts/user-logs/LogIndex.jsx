import DynamicTab from "@/components/DynamicTab";
import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { Stack } from "@mui/material";
import { useCallback, useState } from "react";
const options = [
  { label: "User Log", value: "user_log" },
  { label: "Activity Log", value: "activity_log" },
];
const LogIndex = () => {
  const [value, setValue] = useState("user_log");
  const handleTabChange = useCallback((content) => setValue(content), []);
  const table = {
    columns: [
      // { accessorKey: "id", header: "ID" },
      { accessorKey: "date_time", header: "Date/Time" },
      { accessorKey: "user", header: "User" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "action", header: "Action" },
      { accessorKey: "ip", header: "Ip Address" },
      { accessorKey: "device_info", header: "device info" },
    ],
    data: [
      {
        date_time: "2024-1-16, 9:05",
        user: "John Doe",
        role: "Admin",
        action: "Login",
        ip: "192.168.1.1",
        device_info: "MacBook Air",
      },
    ],
  };
  console.log(value);
  return (
    <Stack>
      <Heading text="Logs" />
      <DynamicTab
        tabOption={options}
        value={value}
        handleTabChange={handleTabChange}
      />
      <div className="py-2">
        <DataTable
          csv={true}
          print={true}
          download={true}
          filter={true}
          columns={table?.columns}
          data={table?.data}
          selectOption={false}
        />
      </div>
    </Stack>
  );
};

export default LogIndex;
