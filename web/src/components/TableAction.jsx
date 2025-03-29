/* eslint-disable react/prop-types */
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Edit, EllipsisVertical, Eye } from "lucide-react";
import { useCallback, useRef, useState } from "react";
export const Action = ({ onViewClick, onEditClick }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(null);
  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="text"
        onClick={handleOpen}
        color="inherit"
        size="small"
      >
        <EllipsisVertical size={16} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography py={1} px={2} fontSize={16} fontWeight="semibold">
          Action
        </Typography>
        <MenuItem
          onClick={() => {
            if (onViewClick) onViewClick();
            handleClose();
          }}
        >
          <Eye size={14} />
          <Typography
            onClick={onViewClick}
            fontsize={14}
            px={2}
            variant="body2"
          >
            View
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Edit size={14} />
          <Typography
            onClick={onEditClick}
            fontsize={14}
            px={2}
            variant="body2"
          >
            Edit
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
