/* eslint-disable react/prop-types */
import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import { X } from "lucide-react";

const DialogHeader = ({ open, onClose, size, headerText, children }) => {
  return (
    <Dialog
      sx={{
        overflowY: "auto",
      }}
      maxWidth={size}
      fullWidth
      open={open}
      onClose={onClose}
    >
      <Stack
        direction="row"
        // justifyContent="space-between"
        alignItems="center"
        bgcolor={"#669CB8"}
        p={2}
      >
        <Typography
          variant="h3"
          fontSize="1.5rem"
          fontWeight="semibold"
          textAlign="center"
          color="white"
          width="100%"
        >
          {headerText}
        </Typography>
        <IconButton onClick={onClose} variant="contained" color="success">
          <X  color="white"/>
        </IconButton>
      </Stack>
      {children}
    </Dialog>
  );
};

export default DialogHeader;
