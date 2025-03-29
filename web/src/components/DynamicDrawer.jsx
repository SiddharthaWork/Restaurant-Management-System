/* eslint-disable react/prop-types */
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "lucide-react";
import { memo } from "react";

const DynamicDrawer = memo(
  ({
    open,
    onClose,
    direction = "right",
    headerText,
    children,
    size = 600,
    submitBtn = false,
    submitAction,
  }) => {
    return (
      <Drawer
        PaperProps={{
          sx: {
            width: size,
            maxWidth: size,
          },
        }}
        anchor={direction}
        open={open}
        onClose={onClose}
      >
        <AppBar position="static" color="transparent" elevation={1}>
          <Stack
            direction={"row"}
            px={2}
            className="items-center justify-between"
          >
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={onClose}>
                <ChevronLeft />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 1 }}>
                {headerText}
              </Typography>
            </Toolbar>
            {submitBtn && (
              <Button onClick={submitAction} variant="contained" size="medium">
                Submit
              </Button>
            )}
          </Stack>
        </AppBar>
        {children}
      </Drawer>
    );
  }
);
DynamicDrawer.displayName = "DynamicDrawer";
export default DynamicDrawer;
