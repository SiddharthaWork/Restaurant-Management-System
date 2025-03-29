import { Box, Stack } from "@mui/material";
import { memo, useState, useCallback } from "react";
import { filterOptions, tables } from "./reserveObj";
import TableCard from "./TableCard";
import SeatedTableDetails from "./SeatedTableDetails";
import AvailableTableDetails from "./AvailableTableDetails.jsx";
import UnavailabeTableDetails from "./UnavailabeTableDetails.jsx";
import ReservedDetails from "./ReservedDetails.jsx";
import DataTable from "@/components/table";
const AllTab = memo(() => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [dialogState, setDialogState] = useState({
    type: null,
    tableDetails: null,
  });
  const clickOnTableCard = useCallback((status, tableData) => {
    const dialogMap = {
      seated: { type: "seated", tableDetails: tableData },
      available: { type: "available", tableDetails: tableData },
      unavailable: { type: "unavailable", tableDetails: tableData },
      reserved: { type: "reserved", tableDetails: tableData },
    };
    setDialogState(dialogMap[status]) || { type: null, tableDetails: null };
  }, []);
  const closeDialog = useCallback(() => {
    setDialogState({ type: null, tableDetails: null });
  }, []);
  const dummyData = {
    columns: [
      {
        accessorKey: "queue",
        header: "Queue",
      },
      { accessorKey: "name", header: "Full Name" },
      { accessorKey: "number", header: "Phone Number" },
      { accessorKey: "pax", header: "PAX" },
      { accessorKey: "email", header: "EMAIL" },
      { accessorKey: "waitTime", header: "Wait Time" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        queue: "#WL_01",
        name: "Brijext shakya",
        number: "9876543212",
        pax: "4",
        email: "example@gmail.com",
        waitTime: "23min",
        action: <div className="flex"></div>,
      },
    ],
  };
  const handleFilterButtonsClick = (value) => {
    console.log(value);
    setActiveFilter(value);
  };
  return (
    <Stack>
      <Box className="flex flex-wrap gap-2" py={1}>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeFilter === option.value
                ? "bg-teal-500 text-white hover:bg-teal-600"
                : " text-gray-600 hover:bg-gray-100 shadow-lg drop-shadow-lg"
            }`}
            onClick={() => handleFilterButtonsClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </Box>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {activeFilter !== "waitlist" ? (
          tables.map((table, index) => (
            <TableCard key={index} onClick={clickOnTableCard} table={table} />
          ))
        ) : (
          <Box className='col-span-12'>
            <DataTable
              columns={dummyData?.columns}
              data={dummyData?.data}
              canSearch={false}
            />
          </Box>
        )}
        {dialogState.type === "seated" && (
          <SeatedTableDetails
            details={dialogState.tableDetails}
            open={dialogState.type === "seated"}
            onClose={closeDialog}
          />
        )}

        {dialogState.type === "available" && (
          <AvailableTableDetails
            details={dialogState.tableDetails}
            open={dialogState.type === "available"}
            onClose={closeDialog}
          />
        )}
        {dialogState.type === "unavailable" && (
          <UnavailabeTableDetails
            details={dialogState.tableDetails}
            open={dialogState.type === "unavailable"}
            onClose={closeDialog}
          />
        )}
        {dialogState.type === "reserved" && (
          <ReservedDetails
            details={dialogState.tableDetails}
            open={dialogState.type === "reserved"}
            onClose={closeDialog}
          />
        )}
      </div>
    </Stack>
  );
});
AllTab.displayName = "AllTab";
export default AllTab;
