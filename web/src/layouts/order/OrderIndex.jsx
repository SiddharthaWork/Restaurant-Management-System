import { Box, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import DynamicTab from "../../components/DynamicTab";
import FilterationBar from "../../components/FilterationBar";
import Heading from "../../components/Heading";
import ShowCard from "../table-reservation/components/ShowCard";
import OrderList from "./components/OrderList";
import { orderCardOption, orderTabsOption } from "./components/orderObjects";
import Invoice from "./components/Invoice";
import { FilterDialog } from "../../components/FilterDialogForm";
import FilterForm from "./components/FilterForm";
const OrderIndex = () => {
  const [value, setValue] = useState("order-list");
  const [open, setOpen] = useState(false);
  const closeFilterDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const openFilterDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const handleTabChange = useCallback((state) => {
    setValue(state);
  }, []);
  return (
    <Stack>
      <Heading text="Manange Order" />
      <Stack
        direction={{ md: "row", column: "column" }}
        justifyContent="space-between"
      >
        <DynamicTab
          handleTabChange={handleTabChange}
          value={value}
          tabOption={orderTabsOption}
        />
        <Box
          className="flex flex-wrap gap-x-2 gap-y-1"
          direction="row"
          spacing={1}
        >
          {orderCardOption?.map((item) => (
            <ShowCard
              key={item?.title}
              title={item?.title}
              count={item?.count}
            />
          ))}
        </Box>
      </Stack>
      <FilterationBar
        filterBtnClick={openFilterDialog}
        firstBtnText="New Order"
      >
        <FilterDialog open={open} onClose={closeFilterDialog}>
          <FilterForm />
        </FilterDialog>
      </FilterationBar>
      {value === "order-list" ? <OrderList /> : <Invoice />}
    </Stack>
  );
};

export default OrderIndex;
