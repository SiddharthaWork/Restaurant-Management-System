import Heading from "@/components/Heading";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import { Stack } from "@mui/material";

const DeliveryIndex = () => {
  const table = {
    columns: [
      { accessorKey: "id", header: "Order Id" },
      { accessorKey: "date", header: "Date & Time" },
      { accessorKey: "name", header: "customer Name" },
      { accessorKey: "details", header: "Order Details" },
      { accessorKey: "amount", header: "Total Amount" },
      { accessorKey: "status", header: " status" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        date: "2022-01-01",
        details: "Spaghetti Carbonara",
        amount: 10,
        status: "Delivered",
        action: <Action />,
      },
    ],
  };
  return (
    <>
      <Heading text="Delivery Management" />
      <Stack pt={1}>
        <DataTable
          columns={table?.columns}
          data={table?.data}
          csv={true}
          print={true}
          download={true}
        />
      </Stack>
    </>
  );
};

export default DeliveryIndex;
