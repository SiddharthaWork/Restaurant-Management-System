import DialogHeader from "@/layouts/table-reservation/components/DialogHeader";
import { Card, Divider, Typography } from "@mui/material";
import React from "react";

const AssignTableDialog = ({ onClose, open }) => {
  return (
    <DialogHeader
      onClose={onClose}
      open={open}
      headerText="Choose Table to Assign"
    >
      {/* Available Tables  */}
    </DialogHeader>
  );
};

export default AssignTableDialog;

const AvailableTableCard = () => {
  return (
    <Card className="border-2 border-green-700 ">
      <div className="flex flex-col items-center justify-center p-2 text-green-700">
        <Typography variant="h6" fontWeight="semiboldI" size="1rem">
          T-1
        </Typography>
        <p size="text-base">f-1</p>
      </div>
      <Divider orientation="vertical" />
      <div className="flex items-center justify-center gap-1 p-2 text-green-700">
        <p>2</p>
      </div>
    </Card>
  );
};
