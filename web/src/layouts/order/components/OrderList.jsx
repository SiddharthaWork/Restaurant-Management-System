import { Box, Stack } from "@mui/material";
import { memo, useState } from "react";
import OrderCard from "./OrderCard";
import { orderFilterButtonTabs } from "./orderObjects";
const OrderList = memo(() => {
  const [activeFilter, setActiveFilter] = useState("all");
  const orders = [
    {
      id: 1,
      ticketNumber: "T-01",
      customerName: "Binod",
      orderNumber: "#OR-0183",
      time: "11:15 AM",
      date: "Friday, Nov 22, 2024",
      itemCount: 6,
      total: 2340,
      status: "ready",
    },
    {
      id: 2,
      ticketNumber: "T-01",
      customerName: "Binod",
      orderNumber: "#OR-0183",
      time: "11:15 AM",
      date: "Friday, Nov 22, 2024",
      itemCount: 6,
      total: 2340,
      status: "in-progress",
    },
    {
      id: 3,
      ticketNumber: "T-01",
      customerName: "Binod",
      orderNumber: "#OR-0183",
      time: "11:15 AM",
      date: "Friday, Nov 22, 2024",
      itemCount: 6,
      total: 2340,
      status: "served",
    },
    {
      id: 4,
      ticketNumber: "T-01",
      customerName: "Binod",
      orderNumber: "#OR-0183",
      time: "11:15 AM",
      date: "Friday, Nov 22, 2024",
      itemCount: 6,
      total: 2340,
      status: "not-touched",
    },
    {
      id: 5,
      ticketNumber: "T-01",
      customerName: "Binod",
      orderNumber: "#OR-0183",
      time: "11:15 AM",
      date: "Friday, Nov 22, 2024",
      itemCount: 6,
      total: 2340,
      status: "complaint",
    },
  ];
  return (
    <Stack>
      <Box className="flex flex-wrap gap-x-2 gap-y-1">
        {orderFilterButtonTabs.map((option) => (
          <button
            key={option.value}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeFilter === option.value
                ? "bg-teal-500 text-white hover:bg-teal-600"
                : " text-gray-600 hover:bg-gray-100 shadow-lg drop-shadow-lg"
            }`}
            onClick={() => setActiveFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </Box>
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order) => (
          <OrderCard key={order?.id} {...order} />
        ))}
      </div>
    </Stack>
  );
});
OrderList.displayName = "OrderList";
export default OrderList;
