import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Edit, EllipsisVertical, Eye } from "lucide-react";
import { useRef, useState, useCallback } from "react";

export const ActionButton = ({ handleViewClick, handleEditClick }) => {
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

  const onMenuItemClick = useCallback(
    (action) => {
      action();
      handleClose();
    },
    [handleClose]
  );

  return (
    <>
      <Button
        ref={buttonRef}
        variant="text"
        onClick={handleOpen}
        color="inherit"
        size="small"
        aria-label="Action Menu"
      >
        <EllipsisVertical size={16} />
      </Button>
      <Menu
        id="action-menu"
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
        <MenuItem onClick={() => onMenuItemClick(handleViewClick)}>
          <Eye size={14} />
          <Typography fontSize={14} px={2} variant="body2">
            View
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => onMenuItemClick(handleEditClick)}>
          <Edit size={14} />
          <Typography fontSize={14} px={2} variant="body2">
            Edit
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
