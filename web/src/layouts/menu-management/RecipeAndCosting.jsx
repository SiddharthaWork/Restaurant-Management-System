/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import { Plus } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import DataTable from "../../components/table";
import RecipeCustomForm from "./components/RecipeCustomForm";
import { Action } from "@/components/TableAction";
import Heading from "@/components/Heading";

const RecipeAndCosting = () => {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const formRef = useRef(null);

  const handleOpen = useCallback((context) => setOpen(context), []);
  const handleClose = useCallback(() => setOpen(null), []);
  const handleViewClick = useCallback((link) => {
    const cleanPathname = pathname.replace(/\/$/, "");
    navigate(`${cleanPathname}/${link}`);
  }, []);
  const table = {
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Dish Name" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "cost", header: "Total Cost" },
      { accessorKey: "sp", header: "Selling Price" },
      { accessorKey: "profit", header: "Profit Margin" },
      { accessorKey: "action", header: "Action" },
    ],
    data: [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        category: "Pasta",
        cost: 5.0,
        sp: 12.0,
        profit: 7.0,
        action: (
          <Action onViewClick={() => handleViewClick("spaghettin carbonara")} />
        ),
      },
      {
        id: 2,
        name: "Margherita Pizza",
        category: "Pizza",
        cost: 4.5,
        sp: 10.0,
        profit: 5.5,
        action: <Action />,
      },
      {
        id: 3,
        name: "Caesar Salad",
        category: "Salad",
        cost: 3.0,
        sp: 8.0,
        profit: 5.0,
        action: <Action />,
      },
      {
        id: 4,
        name: "Grilled Salmon",
        category: "Seafood",
        cost: 8.0,
        sp: 20.0,
        profit: 12.0,
        action: <Action />,
      },
      {
        id: 5,
        name: "Chocolate Lava Cake",
        category: "Dessert",
        cost: 2.5,
        sp: 6.0,
        profit: 3.5,
        action: <Action />,
      },
    ],
  };
  return (
    <>
      <Heading text="Recipe and Costing" />
      <Stack py={2}>
        <DataTable
          columns={table?.columns}
          data={table?.data}
          entriesPerPage={10}
          print={true}
          filter={true}
          csv={true}
          download={true}
          // selectOption={false}
        >
          <CustomButton
            onClick={() => handleOpen("custormFormDrawer")}
            startIcon={<Plus size={16} />}
            size="medium"
          >
            New Recipe
          </CustomButton>
          <RecipeCustomForm
            formRef={formRef}
            open={open === "custormFormDrawer"}
            onClose={handleClose}
          />
        </DataTable>
      </Stack>
    </>
  );
};

export default RecipeAndCosting;
