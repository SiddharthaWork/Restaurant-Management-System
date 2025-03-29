/* eslint-disable react/prop-types */
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Bell } from "lucide-react";
import { useState } from "react";
import SharedBredcrumb from "./DynamicBreadCrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
const Navbar = () => {
  return (
    <header className="flex items-center justify-between h-16 gap-2 px-4 border-b shrink-0">
      <Stack direction="row" className="items-center" spacing={2}>
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4 mr-2" />
        <div className="hidden xl:block">
          <SharedBredcrumb />
        </div>
        <SearchBar />
      </Stack>
      <Stack direction="row" className="items-center" spacing={2}>
        <div className="hidden md:block">
          <CalendarUI />
        </div>
        <Badge className="cursor-pointer" badgeContent={4} color="warning">
          <Bell size={20} />
        </Badge>
        <div className="hidden">
          <Avatar></Avatar>
        </div>
      </Stack>
    </header>
  );
};

export default Navbar;
export const SearchBar = ({ changeHandler }) => {
  return (
    <div className="relative mx-auto text-gray-600">
      <input
        autoComplete="off"
        className="h-10 px-5 pl-10 text-sm bg-white border-2 border-gray-300 rounded-full focus:outline-green-50 "
        type="search"
        name="search"
        placeholder="Search"
        onChange={changeHandler}
      />
      <button type="submit" className="absolute top-0 left-0 m-4 mt-3">
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
const CalendarUI = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={handleOpen}>
          <CalendarTodayIcon />
        </IconButton>

        <Typography variant="body1">
          {selectedDate.format("MMM D, YYYY")}
        </Typography>

        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ p: 2, bgcolor: "background.paper", boxShadow: 3 }}>
              <DatePicker
                value={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  handleClose();
                }}
                renderInput={() => null}
              />
            </Box>
          </ClickAwayListener>
        </Popper>
      </Box>
    </LocalizationProvider>
  );
};
