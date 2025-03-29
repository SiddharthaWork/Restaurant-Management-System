import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FaCirclePlus } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

const Entry = ({ closeadditemclick }) => {
  return (
    <Box className="w-full md:h-screen flex justify-center items-center sticky md:mt-0 mt-10 md:fixed md:inset-0 px-4 sm:px-10 lg:px-32 md:bg-black/10 z-50">
      <Box className="w-full max-w-5xl h-auto bg-white flex flex-col rounded-xl overflow-hidden">
        {/* Header */}
        <Box className="w-full h-16 bg-[#669CB8] flex items-center justify-between px-4 sm:px-6">
          <Typography
            variant="h6"
            className="uppercase text-white font-semibold tracking-wider"
          >
            Purchase Entry
          </Typography>
          <RxCrossCircled
            size={30}
            color="white"
            onClick={closeadditemclick}
            className="cursor-pointer"
          />
        </Box>

        {/* Form Section */}
        <Box className="flex flex-col w-full h-auto p-4 space-y-6">
          {/* Row 1 */}
          <Box className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Item Name</Typography>
              <TextField placeholder="Enter Item Name" size="small" fullWidth />
            </FormControl>

            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Bill Number</Typography>
              <TextField placeholder="Enter Bill Number" size="small" fullWidth />
            </FormControl>

            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Vendor Name</Typography>
              <TextField placeholder="Enter Vendor Name" size="small" fullWidth />
            </FormControl>
          </Box>

          {/* Row 2 */}
          <Box className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Category</Typography>
              <Box className="flex gap-2 items-center">
                <Select
                  defaultValue=""
                  displayEmpty
                  size="small"
                  fullWidth
                  className="text-gray-500"
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                <FaCirclePlus size={32} color="#51B0AA" />
              </Box>
            </FormControl>

            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Type</Typography>
              <Box className="flex gap-2 items-center">
                <Select
                  defaultValue=""
                  displayEmpty
                  size="small"
                  fullWidth
                  className="text-gray-500"
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                <FaCirclePlus size={32} color="#51B0AA" />
              </Box>
            </FormControl>

            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Stock Quantity</Typography>
              <TextField
                type="number"
                placeholder="Enter Number"
                size="small"
                fullWidth
              />
            </FormControl>
          </Box>

          {/* Row 3 */}
          <Box className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Expiration Date</Typography>
              <TextField type="date" size="small" fullWidth />
            </FormControl>

            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Purchase Date</Typography>
              <TextField type="date" size="small" fullWidth />
            </FormControl>

            <FormControl className="flex flex-col gap-1 w-full sm:w-1/3">
              <Typography>Cost Per Unit</Typography>
              <TextField
                type="number"
                placeholder="Enter Amount"
                size="small"
                fullWidth
              />
            </FormControl>
          </Box>

          {/* Tax Section */}
          <Box className="flex flex-col gap-2">
            <Typography className="text-black text-lg">Tax</Typography>
            <RadioGroup row>
              <FormControlLabel
                value="including"
                control={<Radio size="small" color="success" />}
                label="Including Tax"
              />
              <FormControlLabel
                value="excluding"
                control={<Radio size="small" color="success" />}
                label="Excluding Tax"
              />
            </RadioGroup>
          </Box>

          {/* Submit Button */}
          <Box className="flex justify-end">
            <Button
              variant="contained"
              style={{ backgroundColor: "#669CB8", color: "white" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Entry;
