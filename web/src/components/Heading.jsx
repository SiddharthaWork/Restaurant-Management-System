/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

const Heading = ({ text }) => {
  return (
    <Typography variant="h1" py={2} fontSize="2rem" fontWeight="bold">
      {text}
    </Typography>
  );
};

export default Heading;
