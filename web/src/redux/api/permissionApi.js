import { baseApi } from "./baseApi";
const permissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePermission: builder.mutation({
      query: ({ id, body }) => ({
        url: `permission/${id}`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["permissions"],
    }),
    getAllPermission: builder.query({
      query: () => "permission",
    }),
    getPermissionByUserId: builder.query({
      query: (id) => `permission/${id}`,
    }),
  }),
});

export default permissionApi;
export const {
  useUpdatePermissionMutation,
  useGetAllPermissionQuery,
  useGetPermissionByUserIdQuery,
  useLazyGetPermissionByUserIdQuery,
} = permissionApi;
