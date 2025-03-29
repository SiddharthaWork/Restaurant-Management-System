/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Filter, X } from "lucide-react";

export const FilterDialog = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Stack
          direction="row"
          py={1}
          className="items-center justify-between"
          borderBottom="1px solid gray"
        >
          <Stack direction="row" className="items-center" spacing={1}>
            <Filter size={18} />
            <Typography
              variant="body1"
              fontWeight="semibold"
              component="p"
              fontSize="1rem"
            >
              Filter
            </Typography>
          </Stack>
          <IconButton variant="contained" onClick={onClose} color="secondary">
            <X className="cursor-pointer" />
          </IconButton>
        </Stack>
        <Stack py={1} spacing={1}>
          <Typography
            varaint="body1"
            color="textSecondary"
            component="p"
            fontSize=".8rem"
          >
            Date Range
          </Typography>
          {children}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
