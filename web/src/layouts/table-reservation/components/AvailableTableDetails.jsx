/* eslint-disable react/prop-types */
import { ChevronRight } from "lucide-react";
import DialogHeader from "./DialogHeader";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  TextField,
  IconButton,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import { useFormik } from "formik";
import { memo } from "react";
import { Box } from "@mui/system";
import { ChevronUp } from "lucide-react";

const AvailableTableDetails = memo(({ open, onClose }) => {
  const [show, setShow] = useState(false);

  const showSeatDetails = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  const formik = useFormik({
    initialValues: {
      status: "available",
      paxCount: 0,
    },
    onSubmit: (values) => {
      console.log("Form submitted with:", values);
    },
  });
  const { values, setFieldValue } = formik;
  const radioButtonList = [
    { label: "Available", value: "available", color: "success" },
    { label: "Seated", value: "seated", color: "secondary" },
    { label: "Reserved", value: "reserved" },
    { label: "Waitlist", value: "waitlist" },
    { label: "Unavailable", value: "unavailable", color: "default" },
  ];

  console.log(values);
  return (
    <DialogHeader
      open={open}
      size="md"
      headerText="Table Details"
      onClose={onClose}
    >
      <Stack p={2}>
        <Stack className="p-2 border-2 rounded-md">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p className="text-lg font-medium">Change Status</p>
            {show ? (
              <ChevronDown onClick={showSeatDetails} size={16} />
            ) : (
              <ChevronRight onClick={showSeatDetails} size={16} />
            )}
          </Stack>

          {show && (
            <Stack direction="row" py={1} spacing={1}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  aria-label="table-status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  className="flex items-center gap-2"
                >
                  <Box className="flex flex-wrap gap-2">
                    {radioButtonList.map((item) => (
                      <div
                        key={item.value}
                        className="px-1 py-0 border rounded-md"
                      >
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Radio
                              size="small"
                              color={item?.color && item?.color}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 16,
                                },
                              }}
                            />
                          }
                          label={item.label}
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: 16, // Adjust the font size of the label
                            },
                          }}
                        />
                      </div>
                    ))}
                  </Box>
                </RadioGroup>
              </FormControl>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={4}>
          <FormLabel>Pax/Seat</FormLabel>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              name="paxCount"
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
        </Stack>
      </Stack>
    </DialogHeader>
  );
});
AvailableTableDetails.displayName = "AvailableTableDetails";
export default AvailableTableDetails;
