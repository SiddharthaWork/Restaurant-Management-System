import FilterationBar from "@/components/FilterationBar";
import DataTable from "@/components/table";
import { Action } from "@/components/TableAction";
import { Card, CardContent, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { EmployeeProfile } from "./EmployeeProfile";
import Performance from "./Performance";
import Employees from "./Employees";
import { useCallback } from "react";
import EmployeeCustomForm from "./EmployeeCustomForm";
import EmployeeFilter from "./EmployeeFilter";
const EmployeeList = () => {
  const [tab, setTab] = useState("performance");
  const [openDrawer, setDrawer] = useState(false);
  const [openFilter, setFilter] = useState(false);
  const handleOpenDrawer = useCallback(() => setDrawer(true), []);
  const closeDrawer = useCallback(() => setDrawer(false), []);
  const handleOpenFilter = useCallback(() => setFilter(true), []);
  const closeFilter = useCallback(() => setFilter(false), []);
  const table = {
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Dish Name" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "cost", header: "Total Cost" },
      { accessorKey: "sp", header: "Selling Price" },
      { accessorKey: "profit", header: "Profit Margin" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
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
  console.log(openDrawer);
  return (
    <Stack>
      <FilterationBar
        datePicker={false}
        firstBtnText="Add Employee"
        handleFirstBtnClick={handleOpenDrawer}
        filterBtnClick={handleOpenFilter}
      />
      <EmployeeFilter open={openFilter} onClose={closeFilter} />
      <div className="grid xl:gap-x-4 gap-y-4 grid-cols-1 xl:grid-cols-12">
        <Employees />
        <Stack className="col-span-8" spacing={1}>
          <EmployeeProfile />
          <Card>
            <CardContent>
              <Tabs value={tab} onChange={(_, nv) => setTab(nv)}>
                <Tab label="Performance" value="performance" />
                <Tab label="Table Served" value="table-served" />
              </Tabs>
              <Stack>
                {tab === "performance" ? (
                  <Performance />
                ) : (
                  <DataTable
                    columns={table?.columns}
                    data={table?.data}
                    canSearch={false}
                  />
                )}
              </Stack>
              <EmployeeCustomForm
                open={openDrawer}
                onClose={closeDrawer}
                headerText="Add New Employee"
              />
            </CardContent>
          </Card>
        </Stack>
      </div>
    </Stack>
  );
};

export default EmployeeList;
