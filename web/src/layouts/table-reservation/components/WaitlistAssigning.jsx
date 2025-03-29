/* eslint-disable react/prop-types */
import {
  Button,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DialogHeader from "./DialogHeader";
import { useFormik } from "formik";
import { Plus } from "lucide-react";

const WaitlistAssigning = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      floor: "",
      table: "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const floorOptions = [
    { value: 1, label: "Floor 1" },
    { value: 2, label: "Floor 2" },
    { value: 3, label: "Floor 3" },
  ];

  const tableOptions = [
    { value: 101, label: "Table 101" },
    { value: 102, label: "Table 102" },
    { value: 103, label: "Table 103" },
  ];

  return (
    <DialogHeader open={open} onClose={onClose} headerText="Assign Seat">
      <DialogContent>
        <Stack>
          <Typography variant="h6">Curent Queue</Typography>
          <Button>Off</Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography fontWeight="semibold" variant="h6">
            Assign Table
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing={2} sx={{ width: 300 }}>
              {/* Floor Selection */}
              <FormControl fullWidth>
                <InputLabel id="floor-label">Select Floor</InputLabel>
                <Select
                  labelId="floor-label"
                  name="floor"
                  value={formik.values.floor}
                  onChange={formik.handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Floor
                  </MenuItem>
                  {floorOptions.map((floor) => (
                    <MenuItem key={floor.value} value={floor.value}>
                      {floor.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Table Selection */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  name="table"
                  label="Select Table Number"
                  select
                  value={formik.values.table}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Table Number
                  </MenuItem>
                  {tableOptions.map((table) => (
                    <MenuItem key={table.value} value={table.value}>
                      {table.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* Add Button */}
                <IconButton
                  color="primary"
                  type="button"
                  onClick={() => alert("Add button clicked!")}
                >
                  <Plus />
                </IconButton>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </DialogContent>
    </DialogHeader>
  );
};

export default WaitlistAssigning;
