import { baseApi } from "./baseApi";

const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTables: builder.query({
      query: () => "/table",
      providesTags: ["table"],
    }),
    createTable: builder.mutation({
      query: (body) => ({ url: "table", body, method: "POST" }),
      invalidatesTags: ["table"],
    }),
    deleteTable: builder.mutation({
      query: (id) => ({ url: `table/${id}`, method: "Delete" }),
      invalidatesTags: ["table"],
    }),
    getFloorPlans: builder.query({
      query: () => "table/floor",
      providesTags: ["floorplan"],
    }),
    createFloorPlan: builder.mutation({
      query: (body) => ({ url: "table/floor", method: "POST", body }),
      invalidatesTags: ["floorplan"],
    }),
    deleteFloorPlan: builder.mutation({
      query: (id) => ({
        url: `table/floor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["floorplan"],
    }),
  }),
});
export const {
  useCreateTableMutation,
  useGetAllTablesQuery,
  useDeleteTableMutation,
  useGetFloorPlansQuery,
  useCreateFloorPlanMutation,
  useDeleteFloorPlanMutation,
} = tableApi;
