import Heading from "@/components/Heading";
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import {
  useCreateBeverageSizesMutation,
  useCreateFoodSizesMutation,
  useDeleteBeverageSizeMutation,
  useDeleteFoodSizeMutation,
  useGetBeveageSizesQuery,
  useGetFoodSizesQuery,
} from "@/redux/api/menuApi";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { toast } from "react-toastify";
import SharedTable from "../components/SharedTables";
import { ActionButtons } from "../employee/EmployeeConfigurationIndex";

const MenuConfigurationIndex = () => {
  const { data: foodSizes } = useGetFoodSizesQuery();
  const [
    createFoodSize,
    { isLoading: creatingFood, isSuccess: foodCreatingSuccess },
  ] = useCreateFoodSizesMutation();
  const [deleteFoodSize] = useDeleteFoodSizeMutation();
  const { data: beverageSizes } = useGetBeveageSizesQuery();
  const [
    createBeverageSize,
    { isLoading: creatingBeverage, isSuccess: beverageSuccess },
  ] = useCreateBeverageSizesMutation();
  const [deleteBeverageSize] = useDeleteBeverageSizeMutation();
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );
  const foodSizeData = useMemo(
    () =>
      foodSizes
        ? foodSizes?.data.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                type="food"
                onDelete={() => deleteFunction(item._id, "food")}
              />
            ),
          }))
        : [],
    [foodSizes]
  );
  const beverageSizeData = useMemo(
    () =>
      beverageSizes
        ? beverageSizes?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                type="beverage"
                onDelete={() => deleteFunction(item._id, "beverage")}
              />
            ),
          }))
        : [],
    [beverageSizes]
  );
  const deleteFunction = async (id, type) => {
    try {
      let res;
      switch (type) {
        case "food":
          res = await deleteFoodSize(id).unwrap();
          break;
        case "beverage":
          res = await deleteBeverageSize(id).unwrap();
          break;
      }
      if (res.success) toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };
  const foodSubmit = async (values) => {
    const result = values?.itemSize?.map((size) => ({ name: size }));
    try {
      let res = await createFoodSize(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };
  const beverageSubmit = async (values) => {
    const result = values?.beverageSize?.map((size) => ({ name: size }));
    try {
      let res = await createBeverageSize(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack>
      <Heading text="Menu" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <SharedTable
          dialogHeaderText="CREATE ITEM SIZE"
          headerBtnText="Add New Size"
          headerText="Item Size"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              name="itemSize"
              onSubmit={foodSubmit}
              loading={creatingFood}
              success={foodCreatingSuccess}
              initialValues={{ itemSize: [""] }}
              formlabel="Item Size"
            />
          }
          table={{ columns, data: foodSizeData }}
        />
        <SharedTable
          dialogHeaderText="CREATE BEVERAGE SIZE"
          headerBtnText="Add New Size"
          headerText="Item Size"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              loading={creatingBeverage}
              success={beverageSuccess}
              name="beverageSize"
              initialValues={{ beverageSize: [""] }}
              formlabel="Beverage Size"
              onSubmit={beverageSubmit}
            />
          }
          table={{ columns, data: beverageSizeData }}
        />
      </div>
    </Stack>
  );
};

export default MenuConfigurationIndex;
