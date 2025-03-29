import { baseApi } from "./baseApi";
const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFoodSizes: builder.query({
      query: () => "menu/foodsize",
      providesTags: ["menuSize"],
    }),
    createFoodSizes: builder.mutation({
      query: (body) => ({ url: "menu/foodsize", body, method: "POST" }),
      invalidatesTags: ["menuSize"],
    }),
    deleteFoodSize: builder.mutation({
      query: (id) => ({ url: `menu/foodsize/${id}`, method: "DELETE" }),
      invalidatesTags: ["menuSize"],
    }),
    getBeveageSizes: builder.query({
      query: () => "menu/foodsize",
      providesTags: ["menuSize"],
    }),
    createBeverageSizes: builder.mutation({
      query: (body) => ({ url: "menu/foodsize", body, method: "POST" }),
      invalidatesTags: ["menuSize"],
    }),
    deleteBeverageSize: builder.mutation({
      query: (id) => ({ url: `menu/foodsize/${id}`, method: "DELETE" }),
      invalidatesTags: ["menuSize"],
    }),
  }),
});
export const {
  useGetFoodSizesQuery,
  useCreateFoodSizesMutation,
  useDeleteFoodSizeMutation,
  useGetBeveageSizesQuery,
  useCreateBeverageSizesMutation,
  useDeleteBeverageSizeMutation,
} = menuApi;
