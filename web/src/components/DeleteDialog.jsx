/* eslint-disable react/prop-types */

import { Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { TriangleAlert } from "lucide-react";
import CustomButton from "./CustomButton";

const DeleteDialog = ({
  title = "Are You Sure?",
  description,
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div className="flex items-center justify-center w-full">
          <TriangleAlert size={50} className="text-red-500 bg-red-200" />
        </div>
        <Typography variant="h4" textAlign="center" py={2}>
          {title}
        </Typography>
        <Typography varaint="body1" fontSize="1rem" color="gray">
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 2, md: 4 }}
          py={2}
          justifyContent="center"
        >
          <CustomButton backgroundColor="#C0C0C0">Cancel</CustomButton>
          <CustomButton>Confirm</CustomButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
