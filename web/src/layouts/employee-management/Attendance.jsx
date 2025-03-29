import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import { Stack } from "@mui/material";
import { Plus } from "lucide-react";

const Attendance = () => {
  const table = {
    columns: [
      { accessorKey: "id", header: "Employee ID" },
      { accessorKey: "name", header: "employee Name" },
      { accessorKey: "date", header: "date" },
      { accessorKey: "checkin", header: "Check in" },
      { accessorKey: "checkout", header: "Check out" },
      { accessorKey: "status", header: "status" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: "1",
        name: "John Doe",
        date: "2022-01-01",
        checkin: "08:00 AM",
        checkout: "05:00 PM",
        status: "Present",
        action: <Action />,
      },
    ],
  };
  return (
    <>
      <Heading text="Attendance" />
      <Stack py={2}>
        <DataTable  columns={table?.columns} data={table?.data} filter={true}>
          <CustomButton startIcon={<Plus size={16} />}>
            Make Attendance
          </CustomButton>
          
        </DataTable>
      </Stack>
    </>
  );
};

export default Attendance;
