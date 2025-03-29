/* eslint-disable react/prop-types */
import {
  AppBar,
  Card,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "lucide-react";
import { reservationDetailsObj } from "./reserveObj";
import { Headphones } from "lucide-react";
import CustomButton from "../../../components/CustomButton";
import CustomFormDrawer from "./CustomFormDrawer";
import { useCallback, useState, memo } from "react";
const ReservedDetails = memo(({ open, onClose }) => {
  const [openForm, setOpen] = useState(false);
  const setOpenForm = useCallback(() => {
    setOpen(true);
  }, []);
  const setCloseForm = useCallback(() => setOpen(false), []);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ maxWidth: 600, margin: "auto" }}
    >
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            View Reservation Details
          </Typography>
          <CustomButton onClick={setOpenForm}>Edit</CustomButton>
        </Toolbar>
        <CustomFormDrawer open={openForm} onClose={setCloseForm} />
      </AppBar>
      <Stack>
        <DetailsSection
          icon={<Headphones />}
          title="Reservation Details"
          details={reservationDetailsObj?.reservationDetails}
        />
        <DetailsSection
          title="Client Details"
          details={reservationDetailsObj?.clientDetails}
        />
        <Card sx={{ maxWidth: 600, p: 2 }} variant="outlined">
          <Stack direction="row" spacing={2}>
            <Headphones />
            <Typography variant="h6" fontWeight="semibold" sx={{ mb: 1 }}>
              Additional Request
            </Typography>
          </Stack>
          <Divider />
          <Typography
            variant="body2"
            color="text.secondary"
            mt={2}
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {reservationDetailsObj?.additionalRequest}
          </Typography>
        </Card>
      </Stack>
    </Drawer>
  );
});
ReservedDetails.displayName = "ReservedDetails";
export default ReservedDetails;

// Reusable Section Component
const DetailsSection = ({ title, details, icon }) => (
  <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      {icon && icon}
      <Typography variant="h6" fontWeight="semibold" sx={{ mb: 1 }}>
        {title}
      </Typography>
    </Stack>

    <Divider />
    <Stack spacing={1} mt={2}>
      {details.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Card>
);
