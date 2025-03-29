/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    FormLabel,
    Grid2,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { Plus, User2 } from "lucide-react";
import DynamicDrawer from "../../../components/DynamicDrawer";
import React from "react";
import { MenuItem } from "@mui/material";

const CustomForm = ({ open, onClose }) => {
    const formik = useFormik({
        initialValues: {
            date: "",
            category: "",
            description: "",
            amount: "",
            payment: "",
            reason: "",
        },
    });
    const { getFieldProps } = formik;
    return (
        <DynamicDrawer
            open={open}
            headerText="Add New Expense"
            onClose={onClose}
            size="xs"
        >
            <Stack px={2} py={1} className="max-w-screen-sm">
                <FormikProvider value={formik}>
                    <FormTitle Icon={User2} headerText="Expense Details" />
                    <form>
                        <Grid2 container spacing={1}>
                            {categoryDetails?.map((item) => (
                                <Grid2 item key={item?.name} size={{ xs: 12 }}>
                                    <Box>
                                        <FormLabel>{item?.label}</FormLabel>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        select={item.type === "select"}
                                        type={item.type === "select" ? undefined : item?.type}
                                        multiline={item?.multiline || false}
                                        rows={item?.rows || 1}
                                        placeholder={item?.placeholder}
                                        {...getFieldProps(item?.name)}
                                        size="small"
                                    >
                                    {item.type === "select" &&
                                        item.options?.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                </Grid2>
                            ))}
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                mt={2}
                                width={"100%"}
                            >
                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: "#C0C0C0",
                                        color: "#000",
                                        "&:hover": {
                                            backgroundColor: "#A0A0A0",
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: "#669CB8",
                                    color: "#000",
                                    "&:hover": {
                                        backgroundColor: "#669CB8",
                                    },
                                }}>
                                    Save Expense
                                </Button>
                            </Stack>
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
        label: "Date",
        name: "date",
        placeholder: "Enter Category Name",
        type: "text",
    },
    {
        label: "Category",
        name: "category",
        placeholder: "Select Category",
        type: "select",
        options: ["Food", "Travel", "Utilities", "Shopping"],
    },
    {
        label: "Description",
        name: "description",
        placeholder: "Enter Description",
        multiline: true,
        rows: 4,
    },
    {
        label: "Amount",
        name: "amount",
        placeholder: "Enter Amount",
        type: "number",
    },
    {
        label: "Payment Mode",
        name: "payment",
        placeholder: "Select Payment Mode",
        type: "select",
        options: ["Cash", "Credit Card", "Debit Card", "Online Payment"],
    },
    {
        label: "Note/Reason of Expense",
        name: "description",
        placeholder: "Enter Description",
        multiline: true,
        rows: 4,
    },
];
