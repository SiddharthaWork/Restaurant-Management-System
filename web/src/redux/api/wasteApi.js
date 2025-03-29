import { baseApi } from "./baseApi";
const wasteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWasteSource: builder.query({
      query: () => "waste/source",
      providesTags: ["wasteSource"],
    }),
    createWasteSource: builder.mutation({
      query: (body) => ({ url: "waste/source", body, method: "POST" }),
      invalidatesTags: ["wasteSource"],
    }),
    deleteWasteSource: builder.mutation({
      query: (id) => ({ url: `waste/source/${id}`, method: "DELETE" }),
      invalidatesTags: ["wasteSource"],
    }),
    getAllWasteType: builder.query({
      query: () => "waste/type",
      providesTags: ["wasteType"],
    }),
    createWasteType: builder.mutation({
      query: (body) => ({ url: "waste/type", body, method: "POST" }),
      invalidatesTags: ["wasteType"],
    }),
    deleteWasteType: builder.mutation({
      query: (id) => ({ url: `waste/type/${id}`, method: "DELETE" }),
      invalidatesTags: ["wasteType"],
    }),
  }),
});
export const {
  useGetAllWasteSourceQuery,
  useCreateWasteSourceMutation,
  useDeleteWasteSourceMutation,
  useGetAllWasteTypeQuery,
  useCreateWasteTypeMutation,
  useDeleteWasteTypeMutation,
} = wasteApi;
