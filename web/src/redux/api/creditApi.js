import { baseApi } from "./baseApi";
const creditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCreditRepaymentMethod: builder.query({
      query: () => "credit/repaymentmethod",
      providesTags: ["creditRepaymentMethod"],
    }),
    createCreditRepaymentMethod: builder.mutation({
      query: (body) => ({
        url: "credit/repaymentmethod",
        body,
        method: "POST",
      }),
      invalidatesTags: ["creditRepaymentMethod"],
    }),
    deleteCreditRepaymentMethod: builder.mutation({
      query: (id) => ({ url: `credit/repaymentmethod/${id}`, method: "DELETE" }),
      invalidatesTags: ["creditRepaymentMethod"],
    }),
    getAllCreditRepaymentFrequency: builder.query({
      query: () => "credit/repaymentfrequency",
      providesTags: ["creditRepaymentMethod"],
    }),
    createCreditRepaymentFrequency: builder.mutation({
      query: (body) => ({
        url: "credit/repaymentfrequency",
        body,
        method: "POST",
      }),
      invalidatesTags: ["creditRepaymentMethod"],
    }),
    deleteCreditRepaymentFrequency: builder.mutation({
      query: (id) => ({
        url: `credit/repaymentfrequency/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["creditRepaymentMethod"],
    }),
  }),
});
export const {
  useGetAllCreditRepaymentMethodQuery,
  useCreateCreditRepaymentMethodMutation,
  useDeleteCreditRepaymentMethodMutation,
  useGetAllCreditRepaymentFrequencyQuery,
  useCreateCreditRepaymentFrequencyMutation,
  useDeleteCreditRepaymentFrequencyMutation,
} = creditApi;
