/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import DialogHeader from "./DialogHeader";
import { seatedTableData } from "./reserveObj";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useFormik } from "formik";
import CustomButton from "../../../components/CustomButton";
import { tables } from "./reserveObj";
import TableCard from "./TableCard";
import { useCallback } from "react";
import { ChevronsRight } from "lucide-react";
import ChangeWaiter from "./ChangeWaiter";
const SeatedTableDetails = memo(({ open, onClose, details }) => {
  console.log("seated table details");
  const [show, setShow] = useState(false);
  const [openTransferTable, setTransferTableOpen] = useState(false);
  const [changeWaiter, setChangeWaiterOpen] = useState(false);
  const radioButtonList = [
    { label: "Available", value: "available", color: "success" },
    { label: "Seated", value: "seated", color: "secondary" },
    { label: "Reserved", value: "reserved" },
    { label: "Waitlist", value: "waitlist" },
    { label: "Unavailable", value: "unavailable", color: "default" },
  ];
  const handleTransferTable = () => {
    setTransferTableOpen(true);
  };
  const handleCloseTransferTable = () => {
    setTransferTableOpen(false);
  };

  const handleChangeWaiter = () => {
    setChangeWaiterOpen(true);
  };
  const closeChangeWaiter = () => {
    setChangeWaiterOpen(false);
  };

  const handleCheckOrder = () => {
    console.log("Check Order Clicked");
  };
  const showSeatDetails = () => {
    setShow((prev) => !prev);
  };
  const formik = useFormik({
    initialValues: {
      status: "available",
      paxCount: 0,
    },
    onSubmit: (values) => {
      console.log("Form submitted with:", values);
    },
  });
  return (
    <DialogHeader open={open} onClose={onClose} headerText="Table Details">
      <DialogContent>
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
                    <Box className="flex flex-wrap items-center gap-2">
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
                  <Stack
                    direction="row"
                    pt={1}
                    justifyContent="end"
                    spacing={2}
                  >
                    <CustomButton backgroundColor="#C0C0C0">
                      Cancel
                    </CustomButton>
                    <CustomButton backgroundColor="#669CB8">Done</CustomButton>
                  </Stack>
                </FormControl>
              </Stack>
            )}
          </Stack>
        </Stack>
        <DetailsSection
          // title="Table Details"
          details={seatedTableData.tableDetails}
          buttonText="Transfer Table"
          onButtonClick={handleTransferTable}
        />

        <DetailsSection
          title="Waiter Details"
          details={seatedTableData.waiterDetails}
          buttonText="Change Waiter"
          onButtonClick={handleChangeWaiter}
        />

        <DetailsSection
          title="Order Details"
          details={seatedTableData.orderDetails}
          buttonText="Check Order"
          onButtonClick={handleCheckOrder}
        />
        <TableTransferDetails
          details={details}
          open={openTransferTable}
          onClose={handleCloseTransferTable}
        />
        <ChangeWaiter open={changeWaiter} onClose={closeChangeWaiter} />
      </DialogContent>
    </DialogHeader>
  );
});
SeatedTableDetails.displayName = "SeatedTableDetails";

export default SeatedTableDetails;

const DetailsSection = ({ title, details, buttonText, onButtonClick }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {title && (
          <>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Divider />
          </>
        )}
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
        {buttonText && (
          <Button
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const TableTransferDetails = memo(({ open, details, onClose }) => {
  const [selectedTable, setSelectedTable] = useState({
    table_no: null,
    table_details: null,
  });
  const handleOnClick = useCallback(
    (status, table) => {
      if (selectedTable?.table_no === table.tableNumber) {
        return;
      }
      setSelectedTable({ table_no: table.tableNumber, table_details: table });
    },
    [selectedTable]
  );

  return (
    <DialogHeader open={open} onClose={onClose} headerText="Transfer Table">
      <DialogContent>
        <Stack direction="row" alignItems={"center"} spacing={4}>
          {details && <TableCard onClick={() => {}} table={details} />}
          <ChevronsRight className="text-gray-300" size={80} />
          {selectedTable.table_no && (
            <TableCard
              onClick={handleOnClick}
              table={selectedTable?.table_details}
            />
          )}
        </Stack>
        <Typography pt={3}>Choose Table</Typography>
        <Box py={1} className="flex flex-wrap gap-4">
          {tables
            ?.filter((item) => item.status.toLowerCase() === "available")
            ?.map((item) => (
              <TableCard
                onClick={handleOnClick}
                key={item.tableNumber}
                table={item}
              />
            ))}
        </Box>
        <Stack py={2} direction="row" spacing={2} justifyContent="center">
          <CustomButton
            onClick={() => {
              setSelectedTable({
                table_no: null,
                table_details: null,
              });
              onClose();
            }}
            backgroundColor="#C0C0C0"
          >
            Cancel
          </CustomButton>
          <CustomButton>Submit</CustomButton>
        </Stack>
      </DialogContent>
    </DialogHeader>
  );
});
TableTransferDetails.displayName = "TableTransferDetails";
