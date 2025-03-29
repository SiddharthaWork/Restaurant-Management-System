/* eslint-disable react/prop-types */

import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { Minus, Plus, RefreshCcw, User } from "lucide-react";
import DynamicDrawer from "../../../components/DynamicDrawer";
import CustomButton from "../../../components/CustomButton";
import React, { useRef } from "react";
import FileUploadDropzone from "../../../components/FileDropZone";

const RecipeCustomForm = ({ open, onClose }) => {
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      category_name: "",
      item_name: "",
      file: "",
      ingredients: [
        { ingredient_category: "", ingredient: "", quantity: "", price: "" },
      ],
    },
    onSubmit: (values) => {
      console.log("submittting", values);
    },
  });
  const handleSubmit = () => {
    if (formRef.current) formRef.current.submit();

    console.log("click click")
  };
  const { setFieldValue, getFieldProps, values } = formik;
  return (
    <DynamicDrawer
      size={512}
      open={open}
      onClose={onClose}
      headerText="Add New Recipe"
      submitAction={handleSubmit}
      submitBtn={true}
    >
      <FormikProvider value={formik}>
        <Form ref={formRef}>
          <div className="grid w-auto grid-cols-12 p-2 space-y-3 sm:max-w-lg gap-x-2">
            <Titlefield Icon={User} label={"Category Details"} />
            {categoryObj?.map((item) => {
              return (
                <div key={item?.name} className="col-span-12">
                  <Box>
                    <FormLabel sx={{ fontSize: ".9rem" }} className="py-1">
                      {item?.label}
                    </FormLabel>
                  </Box>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={item?.options}
                      value={formik.values[item?.name]}
                      onChange={(event, nv) => setFieldValue(name, nv || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={item?.placeholder}
                        />
                      )}
                    />
                  </FormControl>
                </div>
              );
            })}
            <div className="col-span-12">
              <FormLabel sx={{ fontSize: ".9rem" }} className="py-1">
                Upload
              </FormLabel>

              <FileUploadDropzone name="file" setFieldValue={setFieldValue} />
            </div>
            <Titlefield Icon={User} label="Ingredients Details" />
            <FieldArray
              name="ingredients"
              render={(arrayHelpers) => (
                <div className="grid grid-cols-12 col-span-12 gap-x-3 gap-y-2">
                  {values?.ingredients?.map((item, index) => (
                    <React.Fragment key={index}>
                      {ingredientObj?.map((item) =>
                        item?.type !== "dropdown" ? (
                          <div key={item?.name} className={item?.className}>
                            <Box>
                              <FormLabel sx={{ fontSize: ".9rem" }}>
                                {item?.label}
                              </FormLabel>
                            </Box>
                            <TextField
                              name={item?.name}
                              type={item?.type}
                              size="small"
                              placeholder={item?.placeholder}
                              fullWidth
                              {...getFieldProps(item?.name)}
                            />
                          </div>
                        ) : (
                          <div key={item?.name} className={item?.className}>
                            <Box>
                              <FormLabel
                                sx={{ fontSize: ".9rem" }}
                                className="py-1"
                              >
                                {item?.label}
                              </FormLabel>
                            </Box>
                            <FormControl fullWidth>
                              <Autocomplete
                                options={item?.options}
                                value={formik.values[item?.name]}
                                onChange={(event, nv) =>
                                  setFieldValue(name, nv || "")
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    size="small"
                                    placeholder={item?.placeholder}
                                  />
                                )}
                              />
                            </FormControl>
                          </div>
                        )
                      )}
                      <Box className="flex items-center justify-center w-full h-full">
                        <IconButton color="primary" variant="contained">
                          <RefreshCcw size={24} />
                        </IconButton>
                      </Box>
                      <Box className="flex items-center justify-center w-full h-full">
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)}
                          color="primary"
                          variant="contained"
                        >
                          <Minus size={24} />
                        </IconButton>
                      </Box>
                    </React.Fragment>
                  ))}
                  <div className="col-span-4">
                    <CustomButton
                      backgroundColor="orange"
                      textColor="white"
                      onClick={() =>
                        arrayHelpers.push({
                          ingredient_category: "",
                          ingredient: "",
                          quantity: "",
                          price: "",
                        })
                      }
                      startIcon={<Plus size={16} />}
                      size="small"
                    >
                      Add More
                    </CustomButton>
                  </div>
                </div>
              )}
            />
          </div>
        </Form>
      </FormikProvider>
    </DynamicDrawer>
  );
};

export default RecipeCustomForm;
const categoryObj = [
  {
    type: "dropdown",
    options: ["A", "B", "C", "D"],
    label: "Category Name",
    name: "category_name",
  },
  {
    type: "dropdown",
    options: ["A", "B", "C", "D"],
    label: "Item Name",
    name: "item_name",
  },
];

const ingredientObj = [
  {
    type: "text",
    label: "Ingredient Category",
    placeholder: "Enter Ingredient Category",
    name: "ingredient_category",
    className: "col-span-12",
  },
  {
    type: "dropdown",
    name: "ingrdient",
    label: "Ingredient Category",
    options: ["A", "B", "C"],
    className: "sm:col-span-5  col-span-12",
    placeholder: "Enter Ingredient Category",
  },
  {
    type: "text",
    name: "quantity",
    className: "col-span-3",
    placeholder: "Qty",
    label: "Quantity",
  },
  {
    type: "price",
    placeholder: "Price",
    className: "col-span-3",
    label: "Price",
    name: "price",
  },
];

const Titlefield = ({ Icon, label }) => {
  return (
    <Stack
      className="items-center col-span-12 pt-2"
      spacing={2}
      direction="row"
    >
      <Icon size={16} />
      <Typography variant="h5" fontSize={16} fontWeight="bold">
        {label}
      </Typography>
    </Stack>
  );
};
