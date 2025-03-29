import { baseApi } from "./baseApi";
const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenseCategory: builder.query({
      query: () => "expense/category",
      providesTags: ["expenseCategory"],
    }),
    deleteExpenseCategory: builder.mutation({
      query: (id) => ({ url: `expense/category/${id}`, method: "DELETE" }),
      invalidatesTags: ["expenseCategory"],
    }),
    createExpenseCategory: builder.mutation({
      query: (body) => ({ url: "expense/category", body, method: "POST" }),
      invalidatesTags: ["expenseCategory"],
    }),
    createPaymentCategory: builder.mutation({
      query: (body) => ({ url: "expense/paymentmode", body, method: "POST" }),
      invalidatesTags: ["paymentmode"],
    }),
    getAllPaymentMode: builder.query({
      query: () => "expense/paymentmode",
      providesTags: ["paymentmode"],
    }),
    deletePaymentMode: builder.mutation({
      query: (id) => ({ url: `expense/paymentmode/${id}`, method: "DELETE" }),
      invalidatesTags: ["paymentmode"],
    }),
  }),
});
export const {
  useDeleteExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
  useCreateExpenseCategoryMutation,
  useCreatePaymentCategoryMutation,
  useGetAllPaymentModeQuery,
  useDeletePaymentModeMutation,
} = expenseApi;
