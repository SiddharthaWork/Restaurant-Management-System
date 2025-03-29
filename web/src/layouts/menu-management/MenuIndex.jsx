import { Button, Stack } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import DynamicTab from "../../components/DynamicTab";
import FilterationBar from "../../components/FilterationBar";
import Heading from "../../components/Heading";
import MainDataSection from "./components/MainDataSection";
import { FilterDialog } from "@/components/FilterDialogForm";
import FilterForm from "./components/FilterForm";
import CustomForm from "./components/MenuCustomForm";

const MenuIndex = () => {
  const [value, setValue] = useState("digital-menu");
  const onTabChange = useCallback((status) => {
    setValue(status);
  }, []);

  const [open, setOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const openUpdateForm = useCallback(() => setUpdateForm(true), []);
  const closeUpdateForm = useCallback(() => setUpdateForm(false), []);
  return (
    <Stack>
      <Heading text="Menu Management" />
      <DynamicTab
        value={value}
        handleTabChange={onTabChange}
        tabOption={[
          { label: "Digital Menu", value: "digital-menu" },
          { label: "Food Menu", value: "food-menu" },
          { label: "Beverage Menu", value: "beverage-menu" },
        ]}
      />
      <FilterationBar
        firstBtnText="Update Menu"
        handleFirstBtnClick={openUpdateForm}
        filterBtn={true}
        datePicker={false}
        filterBtnClick={handleOpen}
      >
        <Button
          size="small"
          startIcon={<Trash2 size={16} />}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <FilterDialog open={open} onClose={handleClose}>
          <FilterForm />
        </FilterDialog>
        <CustomForm open={updateForm} onClose={closeUpdateForm} />
      </FilterationBar>

      <MainDataSection />
    </Stack>
  );
};

export default MenuIndex;
