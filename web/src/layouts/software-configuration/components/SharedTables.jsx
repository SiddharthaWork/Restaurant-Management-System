/* eslint-disable react/prop-types */
import CustomButton from "@/components/CustomButton";
import DataTable from "@/components/table";
import DialogHeader from "@/layouts/table-reservation/components/DialogHeader";
import { Box, Paper, Switch, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

const SharedTable = ({
  canSearch = true,
  table,
  headerText,
  headerBtnText,
  customForm,
  dialogHeaderText,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const initialRoles = [
    { id: "01", name: "Counter", enabled: true },
    { id: "02", name: "Admin", enabled: true },
    { id: "02", name: "Waiter App", enabled: true },
    { id: "02", name: "Manager", enabled: true },
  ];
  const handleOpen = useCallback(() => setOpenDialog(true), []);
  const handleClose = useCallback(() => setOpenDialog(false), []);

  const formik = useFormik({
    initialValues: {
      roles: initialRoles,
      selectedRoles: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Paper className="w-full h-full p-6 shadow-sm rounded-xl">
      <Box className="flex items-center justify-between mb-4">
        <Typography
          variant="h6"
          fontSize="1rem"
          className="text-teal-500"
        >
          {headerText}
        </Typography>
        <Box className="flex items-center gap-2">
          <CustomButton
            onClick={handleOpen}
            variant="contained"
            size="small"
            startIcon={<Plus size={16} />}
          >
            {headerBtnText}
          </CustomButton>

          <Switch />
          <DialogHeader
            open={openDialog}
            headerText={dialogHeaderText}
            onClose={handleClose}
          >
            {customForm}
          </DialogHeader>
        </Box>
      </Box>
      <DataTable
        columns={table?.columns}
        canSearch={canSearch}
        data={table?.data}
      />
    </Paper>
  );
};

export default SharedTable;
