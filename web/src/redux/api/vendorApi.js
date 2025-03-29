import { baseApi } from "./baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorList: builder.query({
      query: () => "vendor",
    }),
    createVendorBusiness: builder.mutation({
      query: (body) => ({ url: "vendor/businesstype", body, method: "POST" }),
      invalidatesTags: ["vendorBusinessType"],
    }),
    getAllVendorBusiness: builder.query({
      query: () => "vendor/businessType",
      providesTags: ["vendorBusinessType"],
    }),
    deleteVendorBusiness: builder.mutation({
      query: (id) => ({ url: `vendor/businesstype/${id}`, method: "DELETE" }),
      invalidatesTags: ["vendorBusinessType"],
    }),
  }),
});
export const {
  useGetVendorListQuery,
  useDeleteVendorBusinessMutation,
  useCreateVendorBusinessMutation,
  useGetAllVendorBusinessQuery,
} = vendorApi;
