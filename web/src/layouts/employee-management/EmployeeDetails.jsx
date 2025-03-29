import DynamicTab from "@/components/DynamicTab";
import Heading from "@/components/Heading";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { useCallback, useState } from "react";
import EmployeeCredit from "./components/EmployeeCredit";
import EmployeeList from "./components/Employee-list/EmployeeList";

const EmployeeDetails = () => {
  const [value, setValue] = useState("employee-list");

  const tabOptions = useMemo(
    () => [
      {
        label: "Employee List",
        value: "employee-list",
      },
      {
        label: "Employee Credit",
        value: "employee-credit",
      },
    ],
    []
  );
  const handleTabChange = useCallback((state) => setValue(state), []);
  return (
    <>
      <Heading text="Employee Management" />
      <DynamicTab
        tabOption={tabOptions}
        value={value}
        handleTabChange={handleTabChange}
      />
      <Stack py={2}>
        {value === "employee-list" ? <EmployeeList /> : <EmployeeCredit />}
      </Stack>
    </>
  );
};

export default EmployeeDetails;
