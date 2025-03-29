import { Box, IconButton, Stack, Switch, Typography } from "@mui/material";
import { Edit, Plus, Trash2 } from "lucide-react";
import { memo, useCallback, useState } from "react";
import DeleteDialog from "../../../components/DeleteDialog";
import CustomButton from "../../../components/CustomButton";
import CustomForm from "./MenuCustomForm";
const categoriesData = [
  {
    label: "Salad",
    menuItems: [
      {
        title: "Chicken Caesar Salad",
        description:
          "Grilled chicken, crisp romaine lettuce, parmesan, croutons, and Caesar dressing. parmesan, croutons, and Caesar dressing.",
        status: true,
        _id: "skfoweirpqieurefqiweur",
      },
      {
        title: "Chicken Caesar Salad",
        description:
          "Grilled chicken, crisp romaine lettuce, parmesan, croutons, and Caesar dressing. parmesan, croutons, and Caesar dressing.",
        status: true,
        _id: "skfoweirpqieksjfowieurefqiweur",
      },
      {
        title: "Chicken Caesar Salad",
        description:
          "Grilled chicken, crisp romaine lettuce, parmesan, croutons, and Caesar dressing. parmesan, croutons, and Caesar dressing.",
        status: true,
        _id: "skfoweirpqikzjsfieurefqiweur",
      },
      {
        title: "Chicken Caesar Salad",
        description:
          "Grilled chicken, crisp romaine lettuce, parmesan, croutons, and Caesar dressing. parmesan, croutons, and Caesar dressing.",
        status: true,
        _id: "skfoweirpqieureslkfweorifqiweur",
      },
    ],
    description: "Salad",
    _id: 1,
  },
];
const MainDataSection = memo(() => {
  const [dishes, setMenuDishes] = useState(categoriesData[0]);
  const [dialogName, setDialogName] = useState(false);
  const handleClose = useCallback(() => {
    setDialogName(null);
  }, []);
  const handleOpen = useCallback((dN) => {
    setDialogName(dN);
  }, []);
  console.log("handleclose", dialogName);
  return (
    <Box className="flex flex-col w-full gap-x-6 gap-y-4 md:flex-row">
      <Stack
        spacing={2}
        className="px-2 py-3 bg-gray-200 rounded-md shadow-lg drop-shadow-lg"
      >
        <Typography variant="h5" fontSize="1.3rem" fontWeight="semibold">
          Categories
        </Typography>
        <Stack spacing={1} sx={{ maxWidth: 480, overflow: "auto" }}>
          {categoriesData?.map((item) => {
            return (
              <div
                key={item._id}
                className="flex p-2 bg-white border-primary border-2 rounded-lg items-center justify-between w-full md:w-[460px] "
              >
                <div className="flex gap-2">
                  <img src="" alt="image" />
                  <div>
                    <h6 className="text-xl font-semibold">{item?.label}</h6>
                    <p className="text-gray-500 size=base">
                      {item?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch aria-label="status" size="small" />
                  <IconButton size="small">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpen("delete")}
                    vairant="contained"
                    color="error"
                    size="small"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-center">
            <CustomButton
              onClick={() => handleOpen("add-category")}
              startIcon={<Plus size={16} />}
              size="small"
            >
              Create New Category
            </CustomButton>
          </div>
        </Stack>
      </Stack>
      <Stack spacing={2} className="w-full px-2 py-3 rounded-md shadow-md">
        <Typography variant="h5" fontSize="1.5rem" fontWeight="semibold">
          Menu Items
        </Typography>
        <Stack spacing={1}>
          {dishes?.menuItems?.map((item) => (
            <BeverageItemsCard key={item?._id} />
          ))}
        </Stack>
      </Stack>
      <DeleteDialog open={dialogName == "delete"} handleClose={handleClose} />
      <CustomForm open={dialogName == "add-category"} onClose={handleClose} />
    </Box>
  );
});
MainDataSection.displayName = "MainDataSection";
export default MainDataSection;

const FoodItemsCard = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1, md: 2, xl: 8 }}
      className="p-2 border-2 rounded-md"
    >
      <div className="flex flex-col items-center gap-2 xl:flex-row">
        <img src="" alt="menu image"></img>
        <div>
          <p className="text-sm sm:text-xl text-semibold tracking-loose">
            Chicken Caesar Sala
          </p>
          <p className="text-sm text-justify sm:text-base">
            Grilled chicken, crisp romaine lettuce, parmesan, croutons, and
            Caesar dressing. parmesan, croutons, and Caesar dressing.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <Switch aria-label="status" size="small" />
          <IconButton size="small">
            <Edit size={18} />
          </IconButton>
          <IconButton vairant="contained" color="error" size="small">
            <Trash2 size={18} />
          </IconButton>
        </div>
        <div className="text-lg font-bold sm:text-xl md:text-2xl">Rs 450</div>
      </div>
    </Stack>
  );
};
const BeverageItemsCard = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1, md: 2, xl: 8 }}
      className="p-2 border-2 rounded-md"
    >
      <div className="flex flex-col items-center w-full gap-2 xl:flex-row">
        <img src="" alt="menu image"></img>
        <div>
          <p className="text-lg sm:text-xl text-semibold tracking-loose">
            Chicken Caesar Sala
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="text-center w-fit">
              <p className="text-sm text-gray-500 sm:text-base">30ml</p>
              <p className="text-lg font-bold sm:text-xl md:text-2xl">Rs 450</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <Switch aria-label="status" size="small" />
          <IconButton size="small">
            <Edit size={18} />
          </IconButton>
          <IconButton vairant="contained" color="error" size="small">
            <Trash2 size={18} />
          </IconButton>
        </div>
      </div>
    </Stack>
  );
};
