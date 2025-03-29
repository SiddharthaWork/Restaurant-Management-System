import { Box, Stack } from "@mui/material";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import DynamicTab from "../../components/DynamicTab";
import FilterationBar from "../../components/FilterationBar";
import Heading from "../../components/Heading";
import AllTab from "./components/AllTab";
import { statusCard } from "./components/reserveObj";
import ShowCard from "./components/ShowCard";
import CustomFormDrawer from "./components/CustomFormDrawer";
const ReservationIndex = () => {
  const [value, setValue] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleTabChange = useCallback((setTab) => {
    setValue(setTab);
  }, []);
  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);
  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <Box>
      <Heading text="Table Reservation" />
      <Stack
        direction={{ md: "row", column: "column" }}
        justifyContent="space-between"
      >
        <DynamicTab
          tabOption={[
            { label: "All", value: "all", icon: <Upload /> },
            { label: "Floor 1", value: "floor1", icon: <Upload /> },
            { label: "Floor 2", value: "floor2", icon: <Upload /> },
          ]}
          value={value}
          handleTabChange={handleTabChange}
        />
        <Box className="flex flex-wrap gap-x-2 gap-y-1">
          {statusCard?.map((item) => (
            <ShowCard
              key={item?.label}
              count={item?.count}
              title={item?.label}
            />
          ))}
        </Box>
      </Stack>
      <FilterationBar handleFirstBtnClick={handleDrawerOpen} />
      <AllTab />
      <CustomFormDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </Box>
  );
};

export default ReservationIndex;
