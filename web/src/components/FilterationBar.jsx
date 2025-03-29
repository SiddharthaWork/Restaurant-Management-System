/* eslint-disable react/prop-types */
import { Box, Button, IconButton, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react";
import { useState } from "react";
import CustomButton from "./CustomButton";
const FilterationBar = ({
  filterBtn = true,
  filterBtnText = "Filter",
  datePicker = true,
  filterBtnClick,
  addBtn = true,
  firstBtnText = "New Reservation",
  handleFirstBtnClick,
  children,
}) => {
  return (
    <Stack
      py={2}
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "start", md: "row" }}
      justifyContent="space-between"
      spacing={1}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {filterBtn && (
          <>
            <Button
              color=""
              variant="contained"
              onClick={filterBtnClick}
              startIcon={<Filter size={16} />}
              size="medium"
            >
              {filterBtnText}
            </Button>
          </>
        )}
        <SearchBar />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <ToolbarWithDatePicker datePicker={datePicker}>
          {addBtn && (
            <CustomButton
              onClick={handleFirstBtnClick}
              size="small"
              startIcon={<Plus size={16} />}
            >
              {firstBtnText}
            </CustomButton>
          )}
          {children}
        </ToolbarWithDatePicker>
      </Stack>
    </Stack>
  );
};

export default FilterationBar;

export const SearchBar = () => {
  return (
    <div className="relative mx-auto text-gray-600">
      <input
        className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" className="absolute top-0 right-0 mt-3 mr-4">
        <svg
          className="w-4 h-4 text-gray-600 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style={{ enableBackground: "new 0 0 56.966 56.966" }}
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
  );
};

export function ToolbarWithDatePicker({ datePicker, children }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2} alignItems="center">
        {datePicker && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              // justifyContent: "space-between",
              border: "1px solid #c4c4c4",
              borderRadius: "8px",
              padding: "4px",
              maxWidth: "500px",
            }}
            className="gap-2"
          >
            <IconButton
              onClick={() => setSelectedDate(selectedDate.subtract(1, "day"))}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>

            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="dddd, MMM DD YYYY"
              slotProps={{
                textField: {
                  variant: "standard",
                  InputProps: {
                    disableUnderline: true,
                    style: { textAlign: "center" },
                  },
                },
              }}
            />

            <IconButton
              onClick={() => setSelectedDate(selectedDate.add(1, "day"))}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </Box>
        )}
        {children}
      </Stack>
    </LocalizationProvider>
  );
}
