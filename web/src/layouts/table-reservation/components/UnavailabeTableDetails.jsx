/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import DialogHeader from "./DialogHeader";
import CustomButton from "../../../components/CustomButton";
import { memo } from "react";
const UnavailabeTableDetails = memo(({ open, onClose }) => {
  return (
    <DialogHeader
      open={open}
      onClose={onClose}
      size="sm"
      headerText="Table Details"
    >
      <Stack py={3} spacing={2}>
        <Typography textAlign="center" fontSize="1.3rem" variant="h4">
          Change Status
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center">
          <CustomButton backgroundColor="#C0C0C0" size="medium">
            Cancel
          </CustomButton>
          <CustomButton backgroundColor="#669CB8" size="medium">
            Confirm
          </CustomButton>
        </Stack>
      </Stack>
    </DialogHeader>
  );
});
UnavailabeTableDetails.displayName = "UnavailabeTableDetails";
export default UnavailabeTableDetails;
