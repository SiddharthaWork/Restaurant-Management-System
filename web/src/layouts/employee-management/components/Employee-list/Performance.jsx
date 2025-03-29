import { Card, CardContent, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import BarChart from "./BarChart";
import DoughnutChart from "./EmployeeDoughnut";
import { memo } from "react";

const Performance = memo(() => {
  const [timePeriod, setTimePeriod] = useState("Today");
  console.log("rendering");
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div className="grid md:grid-cols-12 gap-x-2">
      <Card className="col-span-8">
        <CardContent>
          <Typography variant="h6" color="gray">
            Working Hours
          </Typography>
          <Select
            value={timePeriod}
            onChange={handleTimePeriodChange}
            size="small"
            style={{ float: "right" }}
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
          </Select>
          <BarChart />
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardContent className="h-full">
          <Typography variant="h6">Employee Attendance</Typography>
          <div className="w-full h-full flex items-center justify-center">
            <DoughnutChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
Performance.displayName = "Performance";
export default Performance;
