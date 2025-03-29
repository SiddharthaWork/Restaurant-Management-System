/* eslint-disable react/prop-types */
import { Headset, Person } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Field, Form, FormikProvider, useFormik } from "formik";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Headphones,
  Plus,
} from "lucide-react";
const reservationTypes = ["Walk-in", "Online", "Phone"];
const floorPlans = ["Ground Floor", "First Floor", "Outdoor"];
const tableNumbers = ["T-01", "T-02", "T-03", "T-04", "T-05"];

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
}));
export default function ReservationDrawer({ open, onClose }) {
  const initialValues = {
    reservationType: "",
    floorPlan: "",
    paxCount: 0,
    tableNumber: "",
    date: null,
    timeFrom: null,
    timeTo: null,
    title: "Mrs.",
    fullName: "",
    phoneNumber: "",
    email: "",
    deposit: 0,
    additionalRequest: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    values,
    errors,
    getFieldProps,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formik;
  console.log(values);
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
            Add New Reservation
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Stack direction="row" sx={{ alignItems: "center", mb: 3 }} spacing={2}>
          <Headphones />
          <Typography variant="h6">Reservation Details</Typography>
        </Stack>

        <FormikProvider value={formik}>
          <Form>
            <Box
              pb={2}
              className="border-b-2"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Grid>
                <FormLabel width="100%">Reservation Type</FormLabel>
                <TextField
                  select
                  fullWidth
                  name="reservationType"
                  label="Reservation Type"
                  value={values.reservationType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  error={
                    touched.reservationType && Boolean(errors.reservationType)
                  }
                  helperText={touched.reservationType && errors.reservationType}
                >
                  {reservationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <TextField
                select
                // fullWidth
                name="floorPlan"
                label="Floor Plan"
                value={values.floorPlan}
                onChange={handleChange}
                onBlur={handleBlur}
                size="small"
                error={touched.floorPlan && Boolean(errors.floorPlan)}
                helperText={touched.floorPlan && errors.floorPlan}
              >
                {floorPlans.map((plan) => (
                  <MenuItem key={plan} value={plan}>
                    {plan}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  fullWidth
                  name="paxCount"
                  label="Pax/Seat"
                  type="number"
                  value={values.paxCount}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const newPaxCount = values.paxCount + 1;
                      setFieldValue("paxCount", newPaxCount);
                    }}
                  >
                    <ChevronUp />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (values.paxCount > 0) {
                        const newPaxCount = values.paxCount - 1;
                        setFieldValue("paxCount", newPaxCount);
                      }
                    }}
                  >
                    <ChevronDown />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  select
                  fullWidth
                  name="tableNumber"
                  label="Table Number"
                  value={values.tableNumber}
                  onChange={handleChange}
                  size="small"
                  onBlur={handleBlur}
                  error={touched.tableNumber && Boolean(errors.tableNumber)}
                  helperText={touched.tableNumber && errors.tableNumber}
                >
                  {tableNumbers.map((table) => (
                    <MenuItem key={table} value={table}>
                      {table}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton color="primary">
                  <Plus />
                </IconButton>
              </Box>
              <Box>
                <TextField
                  type="date"
                  fullWidth
                  value={values.date}
                  size="small"
                  {...getFieldProps("date")}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  type="time"
                  value={values.timeFrom}
                  size="small"
                  {...getFieldProps("timeFrom")}
                  error={touched.timeFrom && Boolean(errors.timeFrom)}
                  helperText={touched.timeFrom && errors.timeFrom}
                />
                <TextField
                  type="time"
                  fullWidth
                  value={values.timeTo}
                  size="small"
                  {...getFieldProps("timeTo")}
                  error={touched.timeTo && Boolean(errors.timeTo)}
                  helperText={touched.timeTo && errors.timeTo}
                />
              </Box>
            </Box>
            <Stack py={2}>
              <Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Person sx={{ mr: 1 }} />
                  <Typography variant="h6">Client Details</Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontSize="0.875rem" variant="body1" mb={1}>
                    Full Name
                  </Typography>
                  <Box display="flex">
                    <Field
                      as={TextField}
                      select
                      size="small"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ width: "80px", mr: 1 }}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Ms.">Ms.</MenuItem>
                    </Field>
                    <Field
                      as={TextField}
                      name="fullName"
                      placeholder="John Doe"
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={touched.fullName && errors.fullName}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </Box>
                </Box>
                <Box mb={2}>
                  <Typography fontSize="0.875rem" variant="body1" mb={1}>
                    Phone Number
                  </Typography>
                  <Field
                    as={TextField}
                    name="phoneNumber"
                    placeholder="Enter Phone number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={touched.phoneNumber && errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Box>
                <Box mb={2}>
                  <Typography fontSize="0.875rem" variant="body1" mb={1}>
                    Email
                  </Typography>
                  <Field
                    as={TextField}
                    name="email"
                    size="small"
                    placeholder="Somethig@example.com"
                    variant="outlined"
                    fullWidth
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box mb={2}>
                  <Typography fontSize="0.875rem" variant="body1" mb={1}>
                    Deposit
                  </Typography>
                  <Field
                    as={TextField}
                    name="deposit"
                    size="small"
                    placeholder="0.00"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rs</InputAdornment>
                      ),
                    }}
                    error={touched.deposit && errors.deposit}
                    helperText={touched.deposit && errors.deposit}
                  />
                </Box>
              </Box>

              <Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Headset sx={{ mr: 1 }} />
                  <Typography variant="h6">Additional Request</Typography>
                </Box>
                <Field
                  as={TextField}
                  name="additionalRequest"
                  placeholder="Enter Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  error={touched.additionalRequest && errors.additionalRequest}
                  helperText={
                    touched.additionalRequest && errors.additionalRequest
                  }
                />
              </Box>

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <StyledButton variant="outlined" color="inherit" sx={{ mr: 2 }}>
                  Cancel
                </StyledButton>
                <StyledButton type="submit" variant="contained" color="primary">
                  Save Reservation
                </StyledButton>
              </Box>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Drawer>
  );
}
