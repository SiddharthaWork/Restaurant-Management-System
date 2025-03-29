import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import {
  useCreateItemCategoryMutation,
  useCreateItemMutation,
  useCreateItemTypeMutation,
  useDeleteItemCategoryMutation,
  useDeleteItemMutation,
  useDeleteItemTypeMutation,
  useGetallItemQuery,
  useGetItemCategoryQuery,
  useGetItemTypeQuery,
} from "@/redux/api/itemApi";
import {
  Autocomplete,
  Button,
  DialogContent,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { Minus, Plus } from "lucide-react";
import { useMemo } from "react";
import { toast } from "react-toastify";
import SharedTable from "../components/SharedTables";
import { ActionButtons } from "../employee/EmployeeConfigurationIndex";

const ItemConfigurationIndex = () => {
  const { data: itemCategory } = useGetItemCategoryQuery();
  const [
    createNewCategory,
    { isLoading: creatingCategory, isSuccess: categorySuccess },
  ] = useCreateItemCategoryMutation();
  const [deleteCategory] = useDeleteItemCategoryMutation();
  const { data: itemType } = useGetItemTypeQuery();
  const [createNewType, { isLoading: creatingType, isSuccess: typeSuccess }] =
    useCreateItemTypeMutation();
  const [deleteType] = useDeleteItemTypeMutation();
  const { data: itemData } = useGetallItemQuery();
  const [deleteItem] = useDeleteItemMutation();
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );
  const itemCategoryData = useMemo(
    () =>
      itemCategory
        ? itemCategory?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "category")}
              />
            ),
          }))
        : [],
    [itemCategory]
  );
  const itemtypeData = useMemo(
    () =>
      itemType
        ? itemType?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "type")}
              />
            ),
          }))
        : [],
    [itemType]
  );
  const items = useMemo(
    () =>
      itemData
        ? itemData?.data?.map((item) => ({
            id: item._id,
            type: item.name,
            action: (
              <ActionButtons
                id={item._id}
                status={item.isActive}
                onDelete={() => deleteFunction(item._id, "item")}
              />
            ),
          }))
        : [],
    [itemData]
  );
  const onCategorySubmit = async (values) => {
    const result = values?.categoryType?.map((item) => ({ name: item }));
    try {
      const res = await createNewCategory(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const onTypeSubmit = async (values) => {
    const result = values?.purchaseType?.map((item) => ({ name: item }));
    try {
      const res = await createNewType(result).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const deleteFunction = async (id, type) => {
    try {
      let res;
      switch (type) {
        case "category":
          res = await deleteCategory(id).unwrap();
          break;
        case "type":
          res = await deleteType(id).unwrap();
          break;
        case "item":
          res = await deleteItem(id).unwrap();
          break;
      }
      if (res.success) toast.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Heading text="Item" />
      <div className="grid w-full gap-4 xl:grid-cols-2 ">
        <SharedTable
          table={{ columns, data: itemCategoryData }}
          customForm={
            <CreateNecessaryForm
              onSubmit={onCategorySubmit}
              success={categorySuccess}
              loading={creatingCategory}
              name="categoryType"
              initialValues={{ categoryType: [""] }}
              formlabel="Category Name"
            />
          }
          dialogHeaderText="Create Purchase Category"
          headerBtnText="Add New Category"
          headerText="Purchase Category"
        />
        <SharedTable
          table={{ columns, data: itemtypeData }}
          customForm={
            <CreateNecessaryForm
              name="purchaseType"
              success={typeSuccess}
              loading={creatingType}
              onSubmit={onTypeSubmit}
              initialValues={{ purchaseType: [""] }}
              formlabel="Type Name"
            />
          }
          dialogHeaderText="Create Purchase Type"
          headerBtnText="Add New Type"
          headerText="Purchase Type"
        />
        <SharedTable
          table={{ columns, data: items }}
          customForm={<Items />}
          dialogHeaderText="Create Business Type"
          headerBtnText="Add New Type"
          headerText="Business Type"
        />
      </div>
    </div>
  );
};

export default ItemConfigurationIndex;
const Items = () => {
  const [createItem, { isLoading }] = useCreateItemMutation();
  const formik = useFormik({
    initialValues: {
      items: [
        {
          itemName: "",
          category: "",
          purchaseType: "",
          inventoryType: "",
        },
      ],
    },
    onSubmit: async (values) => {
      const result = values?.items?.map((item) => ({
        name: item.itemName,
        category: item.category,
        purchaseType: item.purchaseType,
        inventoryType: item.inventoryType,
      }));
      try {
        const res = await createItem(result).unwrap();
        if (res?.success) {
          toast.success(res?.message);
          resetForm();
        }
      } catch (err) {
        toast.error(err?.data?.message);
      }
    },
  });

  const { values, getFieldProps, resetForm, setFieldValue } = formik;

  return (
    <DialogContent>
      <FormikProvider value={formik}>
        <Form>
          <FieldArray
            name="items"
            render={({ push, remove }) => (
              <div className="space-y-4">
                {values.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="relative p-4 border rounded-lg"
                  >
                    <div className="flex justify-end">
                      {itemIndex > 0 && (
                        <IconButton
                          color="error"
                          className="absolute right-2 top-2"
                          onClick={() => remove(itemIndex)}
                          size="small"
                        >
                          <Minus size={16} />
                        </IconButton>
                      )}
                    </div>
                    <div className="space-y-4">
                      {obj.map((field) =>
                        field.type === "dropdown" ? (
                          <div key={field.name}>
                            <FormLabel>{field.label}</FormLabel>
                            <Autocomplete
                              size="small"
                              options={field.options}
                              getOptionLabel={(option) => option.label}
                              onChange={(_, nv) =>
                                setFieldValue(
                                  `items.${itemIndex}.${field.name}`,
                                  nv ? nv.value : ""
                                )
                              }
                              value={
                                field.options.find(
                                  (option) =>
                                    option.value ===
                                    values.items[itemIndex][field.name]
                                ) || null
                              }
                              renderInput={(params) => (
                                <TextField
                                  fullWidth
                                  size="small"
                                  {...params}
                                  placeholder={field.placeholder}
                                />
                              )}
                            />
                          </div>
                        ) : (
                          <div key={field.name}>
                            <FormLabel>{field.label}</FormLabel>
                            <TextField
                              size="small"
                              fullWidth
                              name={`items.${itemIndex}.${field.name}`}
                              value={values.items[itemIndex][field.name]}
                              placeholder={field.placeholder}
                              {...getFieldProps(
                                `items.${itemIndex}.${field.name}`
                              )}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
                <CustomButton
                  backgroundColor="orange"
                  startIcon={<Plus size={16} />}
                  loading={isLoading}
                  size="small"
                  onClick={() =>
                    push({
                      itemName: "",
                      category: "",
                      purchaseType: "",
                      inventoryType: "",
                    })
                  }
                >
                  Add More
                </CustomButton>
              </div>
            )}
          />
          <div className="flex items-center justify-center pt-4">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </DialogContent>
  );
};
const obj = [
  {
    label: "Item Name",
    name: "itemName",
    placeholder: "Enter Item Name",
    type: "text",
  },
  {
    label: "Category",
    name: "category",
    placeholder: "Select Category",
    type: "dropdown",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    label: "Purchase Type",
    name: "purchaseType",
    placeholder: "Select Type",
    type: "dropdown",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    label: "Inventory Type",
    name: "inventoryType",
    placeholder: "Select Type",
    type: "dropdown",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
];
