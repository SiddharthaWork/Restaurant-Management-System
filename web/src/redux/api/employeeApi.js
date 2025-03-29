import { baseApi } from "./baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeShift: builder.query({
      query: () => "user/shift",
      providesTags: ["employeeShift"],
    }),
    createEmployeeShift: builder.mutation({
      query: (body) => ({ url: "user/shift", body, method: "POST" }),
      invalidatesTags: ["employeeShift"],
    }),
    deleteEmployeeshift: builder.mutation({
      query: (id) => ({ url: `user/shift/${id}`, method: "DELETE" }),
      invalidatesTags: ["employeeShift"],
    }),
    getEmployeeDepartment: builder.query({
      query: () => "user/department",
      providesTags: ["employeeDepartment"],
    }),
    createEmployeeDepartment: builder.mutation({
      query: (body) => ({ url: "user/department", body, method: "POST" }),
      invalidatesTags: ["employeeDepartment"],
    }),
    deleteEmployeeDepartment: builder.mutation({
      query: (id) => ({ url: `user/department/${id}`, method: "DELETE" }),
      invalidatesTags: ["employeeDepartment"],
    }),
    getEmployeeRole: builder.query({
      query: () => "user/role",
      providesTags: ["employeeRole"],
    }),
    createEmployeeRole: builder.mutation({
      query: (body) => ({ url: "user/role", body, method: "POST" }),
      invalidatesTags: ["employeeRole"],
    }),
    deleteEmployeeRole: builder.mutation({
      query: (id) => ({ url: `user/role/${id}`, method: "DELETE" }),
      invalidatesTags: ["employeeRole"],
    }),
    getEmployeePosition: builder.query({
      query: () => "user/position",
      providesTags: ["employeePosition"],
    }),
    createEmployeePosition: builder.mutation({
      query: (body) => ({ url: "user/position", body, method: "POST" }),
      invalidatesTags: ["employeePosition"],
    }),
    deleteEmployeePosition: builder.mutation({
      query: (id) => ({ url: `user/position/${id}`, method: "DELETE" }),
      invalidatesTags: ["employeePosition"],
    }),
  }),
});
export const {
  useGetEmployeeShiftQuery,
  useCreateEmployeeShiftMutation,
  useDeleteEmployeeshiftMutation,
  useGetEmployeeDepartmentQuery,
  useCreateEmployeeDepartmentMutation,
  useDeleteEmployeeDepartmentMutation,
  useGetEmployeeRoleQuery,
  useCreateEmployeeRoleMutation,
  useDeleteEmployeeRoleMutation,
  useGetEmployeePositionQuery,
  useCreateEmployeePositionMutation,
  useDeleteEmployeePositionMutation,
} = employeeApi;
