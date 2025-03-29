import Heading from "@/components/Heading";
import { CreateNecessaryForm } from "@/layouts/user-role/components/RoleConfiguration";
import {
  useCreateExpenseCategoryMutation,
  useCreatePaymentCategoryMutation,
  useDeleteExpenseCategoryMutation,
  useDeletePaymentModeMutation,
  useGetAllExpenseCategoryQuery,
  useGetAllPaymentModeQuery,
} from "@/redux/api/expenseApi";
import { Box, IconButton, Stack, Switch } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { toast } from "react-toastify";
import SharedTable from "../components/SharedTables";

const FinanceConfigurationIndex = () => {
  const { data: expenseCategory } = useGetAllExpenseCategoryQuery();
  const [removeExpenseCategory] = useDeleteExpenseCategoryMutation();
  const [createExpenseCategory, { isLoading, isSuccess }] =
    useCreateExpenseCategoryMutation();
  const { data: paymentMode } = useGetAllPaymentModeQuery();
  const [removePaymentmode] = useDeletePaymentModeMutation();
  const [createPaymentCategory, { isLoading: isCreating, isSuccess: success }] =
    useCreatePaymentCategoryMutation();
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );
  const deletePayment = async (id) => {
    try {
      const res = await removePaymentmode(id).unwrap();
      if (res?.succes) toast.success(res?.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const deleteExpense = async (id) => {
    try {
      const res = await removeExpenseCategory(id).unwrap();
      if (res?.succes) toast.success(res?.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const expenseCategoryData = useMemo(
    () =>
      expenseCategory
        ? expenseCategory?.data?.map((expense) => ({
            id: expense?._id,
            type: expense?.name,
            action: (
              <ActionButtons
                id={expense?._id}
                status={expense?.isActive}
                onDelete={() => deleteExpense(expense?._id)}
              />
            ),
          }))
        : [],
    [expenseCategory]
  );
  const paymentCategoryData = useMemo(
    () =>
      paymentMode
        ? paymentMode?.data?.map((expense) => ({
            id: expense?._id,
            type: expense?.name,
            action: (
              <ActionButtons
                id={expense?._id}
                status={expense?.isActive}
                onDelete={() => deletePayment(expense?._id)}
              />
            ),
          }))
        : [],
    [paymentMode]
  );

  const onCreateCategory = async (values) => {
    const result = values?.expenseCategory?.map((expense) => ({
      name: expense,
    }));
    try {
      const res = await createExpenseCategory(result).unwrap();
      if (res?.success) toast.success(toast.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
  const onCreatePaymentMode = async (values) => {
    const result = values?.paymentMode?.map((mode) => ({ name: mode }));
    try {
      const res = await createPaymentCategory(result).unwrap();
      if (res?.success) toast.success(toast.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
  return (
    <Stack>
      <Heading text="Finance" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <SharedTable
          dialogHeaderText="CREATE EXPENSE CATEGORY"
          headerBtnText="Add New Category"
          headerText="Expense Category"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              onSubmit={onCreateCategory}
              loading={isLoading}
              success={isSuccess}
              name="expenseCategory"
              initialValues={{ expenseCategory: [""] }}
              formlabel="Expense Category"
            />
          }
          table={{ columns, data: expenseCategoryData }}
        />
        <SharedTable
          dialogHeaderText="CREATE PAYMENT MODE"
          headerBtnText="Add New Mode"
          headerText="Payment Mode"
          canSearch={false}
          customForm={
            <CreateNecessaryForm
              success={success}
              onSubmit={onCreatePaymentMode}
              loading={isCreating}
              name="paymentMode"
              initialValues={{ paymentMode: [""] }}
              formlabel="Payment Mode"
            />
          }
          table={{ columns, data: paymentCategoryData }}
        />
      </div>
    </Stack>
  );
};

export default FinanceConfigurationIndex;

 const ActionButtons = ({ id, status, onDelete = () => {} }) => {
  return (
    <Box className="flex items-center gap-2">
      <Switch size="small" checked={Boolean(status)} />
      <IconButton size="small" className="text-gray-600">
        <Edit className="w-4 h-4" />
      </IconButton>
      <IconButton
        size="small"
        className="text-gray-600"
        onClick={() => onDelete(id)}
      >
        <Trash2 className="w-4 h-4" />
      </IconButton>
    </Box>
  );
};
