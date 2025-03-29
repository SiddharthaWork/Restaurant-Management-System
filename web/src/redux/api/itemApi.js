import { baseApi } from "./baseApi";

const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallItem: builder.query({
      query: () => "item",
      providesTags: ["item"],
    }),
    createItem: builder.mutation({
      query: (body) => ({ url: "item", body, method: "POST" }),
      invalidatesTags: ["item"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({ url: `item/${id}`, method: "DELETE" }),
      invalidatesTags: ["item"],
    }),
    getItemCategory: builder.query({
      query: () => "item/category",
      providesTags: ["itemCategory"],
    }),
    createItemCategory: builder.mutation({
      query: (body) => ({ url: "item/category", body, method: "POST" }),
      invalidatesTags: ["itemCategory"],
    }),
    deleteItemCategory: builder.mutation({
      query: (id) => ({ url: `item/category/${id}`, method: "DELETE" }),
      invalidatesTags: ["itemCategory"],
    }),
    getItemType: builder.query({
      query: () => "item/type",
      providesTags: ["itemCategory"],
    }),
    createItemType: builder.mutation({
      query: (body) => ({ url: "item/type", body, method: "POST" }),
      invalidatesTags: ["itemCategory"],
    }),
    deleteItemType: builder.mutation({
      query: (id) => ({ url: `item/type/${id}`, method: "DELETE" }),
      invalidatesTags: ["itemCategory"],
    }),
  }),
});

export const {
  useGetallItemQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetItemCategoryQuery,
  useCreateItemCategoryMutation,
  useDeleteItemCategoryMutation,
  useGetItemTypeQuery,
  useCreateItemTypeMutation,
  useDeleteItemTypeMutation,
} = itemApi;
