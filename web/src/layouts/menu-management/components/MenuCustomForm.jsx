/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  FormLabel,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { Plus, User2 } from "lucide-react";
import CustomButton from "../../../components/CustomButton";
import DynamicDrawer from "../../../components/DynamicDrawer";
import React from "react";

const CustomForm = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      category: {
        name: "",
        description: "",
      },
      menu_items: [
        {
          name: "",
          tag: "",
          description: "",
          size_and_price: [{ size: "", price: "" }],
          topping: [""],
        },
      ],
    },
  });
  const { getFieldProps } = formik;
  return (
    <DynamicDrawer
      open={open}
      headerText="Add New Category"
      onClose={onClose}
      size="xs"
    >
      <Stack px={2} py={1} className="max-w-screen-sm">
        <FormikProvider value={formik}>
          <FormTitle Icon={User2} headerText="Category Details" />
          <form>
            <Grid2 container spacing={1}>
              {categoryDetails?.map((item) => (
                <Grid2 item key={item?.name} size={{ xs: 12 }}>
                  <Box>
                    <FormLabel>{item?.label}</FormLabel>
                  </Box>
                  <TextField
                    fullWidth
                    type={item?.type}
                    multiline={item?.multiline || false}
                    rows={item?.rows || 1}
                    placeholder={item?.placeholder}
                    {...getFieldProps(item?.name)}
                    size="small"
                  />
                </Grid2>
              ))}
              <Divider my={2} />
              <FormTitle Icon={User2} headerText="Menu Item Details" />

              {formik.values?.menu_items?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {menuItems?.map((item) => (
                      <Grid2
                        item
                        key={item?.name}
                        size={{ xs: 12, lg: item?.lg }}
                      >
                        <Box>
                          <FormLabel>{item?.label}</FormLabel>
                        </Box>
                        <TextField
                          type={item?.type}
                          fullWidth
                          multiline={item?.multiline || false}
                          rows={item?.rows || 1}
                          placeholder={item?.placeholder}
                          {...getFieldProps(item?.name)}
                          size="small"
                        />
                      </Grid2>
                    ))}
                    <Grid2 item size={{ xs: 10, lg: 5 }}>
                      <Box>
                        <FormLabel>Size</FormLabel>
                      </Box>
                      <TextField
                        type="text"
                        fullWidth
                        placeholder="Select Size"
                        name="size"
                        {...getFieldProps("size")}
                        size="small"
                      />
                    </Grid2>
                    <Grid2 item size={{ xs: 10, lg: 5 }}>
                      <Box>
                        <FormLabel>Price</FormLabel>
                      </Box>
                      <TextField
                        type="number"
                        fullWidth
                        name="priceI"
                        placeholder="Enter Price"
                        {...getFieldProps("price")}
                        size="small"
                      />
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 2 }}
                      className="flex items-end justify-center"
                    >
                      <CustomButton
                        vaiant="contained"
                        color="secondary"
                        size="large"
                      >
                        <Plus size={24} />
                      </CustomButton>
                    </Grid2>

                    <Grid2 item size={{ xs: 10 }}>
                      <Box>
                        <FormLabel>Topping</FormLabel>
                      </Box>
                      <TextField
                        type="text"
                        fullWidth
                        name="topping"
                        placeholder="Enter Toppings"
                        {...getFieldProps("topping")}
                        size="small"
                      />
                    </Grid2>
                    <Grid2
                      item
                      size={{ xs: 2 }}
                      className="flex items-end justify-center"
                    >
                      <CustomButton
                        vaiant="contained"
                        color="secondary"
                        size="large"
                      >
                        <Plus size={24} />
                      </CustomButton>
                    </Grid2>
                  </React.Fragment>
                );
              })}
            </Grid2>
          </form>
        </FormikProvider>
      </Stack>
    </DynamicDrawer>
  );
};

export default CustomForm;
const FormTitle = ({ headerText, Icon }) => {
  return (
    <Stack direction="rows" alignItems="center" py={1}>
      <Icon size={16} className="mr-2" />
      <Typography fontsize="1.2rem" fontWeight="bold">
        {headerText}
      </Typography>
    </Stack>
  );
};

const categoryDetails = [
  {
    label: "Category Name",
    name: "category-name",
    placeholder: "Enter Category Name",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter Category Name",
    multiline: true,
    rows: 4,
  },
];
const menuItems = [
  {
    name: "item-name",
    label: "Item Name",
    placeholder: "Enter Menu Name",
    type: "text",
  },
  {
    name: "tag",
    label: "Item Tag",
    placeholder: "Select Item Tag",
    type: "text",
  },
  {
    label: "Description",
    name: "item-description",
    placeholder: "Enter Item Description",
    multiline: true,
    rows: 4,
  },
];
