/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { memo } from "react";

const ShowCard = memo(({ title, count }) => {
  return (
    <Box className="bg-white border-2 rounded-md w-fit" py={1} px={2}>
      <p className="font-semibold text-center text-gray-700 font-lg">{title}</p>
      <p className="text-3xl font-bold text-center text-orange-500">{count}</p>
    </Box>
  );
});
ShowCard.displayName = "ShowCard";
export default ShowCard;
