/* eslint-disable react/prop-types */

import { Box, Card, CardContent, Typography } from "@mui/material";
import clsx from "clsx";
import { Armchair } from "lucide-react";
const TableCard = (props) => {
  const { table, onClick } = props;
  const { status, tableNumber, floor, capacity, reservationNumber, timeSlot } =
    table;
  const statusStyles = {
    Available: "border-green-500 bg-green-200",
    Reserved: "border-orange-500 bg-orange-200",
    Seated: "border-pink-500 bg-pink-200",
    Unavailable: "border-gray-500 bg-gray-200",
  };
  const statusBgStyles = {
    Available: "bg-green-200 ",
    Reserved: "bg-orange-200 ",
    Seated: "bg-pink-200 ",
    Unavailable: "border-gray-200 ",
  };
  const statusTextStyles = {
    Available: "text-green-500",
    Reserved: "text-orange-500",
    Seated: "text-pink-500",
    Unavailable: "text-gray-500",
  };

  return (
    <Card
      onClick={() => onClick(status.toLowerCase(), table)}
      className={clsx(
        "rounded-xl border overflow-hidden w-full cursor-pointer",
        statusStyles[status]
      )}
    >
      <CardContent
        className={clsx(
          "p-2 flex flex-col items-center justify-center text-sm font-medium text-center min-h-[65px] max-h-[65px]",
          statusBgStyles[status]
        )}
      >
        <Typography className={clsx(statusTextStyles[status])}>
          {status}
          {timeSlot && <div className="text-xs mt-0.5">{timeSlot}</div>}
        </Typography>
      </CardContent>
      <Box className="flex flex-col items-center p-3 bg-white border-t border-inherit">
        <p className="text-2xl font-semibold">{tableNumber}</p>
        <p className="text-sm text-gray-500">{floor}</p>
        <Box className="flex items-center justify-between w-full mt-2">
          <p className="text-xs text-gray-400">{reservationNumber}</p>
          <Box className="flex items-center justify-between gap-1 text-gray-600">
            <Armchair size={16} className="mr-1" />
            <Typography className="text-sm">
              {capacity.current
                ? `${capacity.current}/${capacity.total}`
                : capacity.total}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default TableCard;
