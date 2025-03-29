import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      let token = getState().configUser.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "vendorBusinessType",
    "expenseCategory",
    "employeeShift",
    "employeeDepartment",
    "employeeRole",
    "employeePosition",
    "table",
    "floorplan",
    "reservationType",
    "wasteSource",
    "wasteType",
    "item",
    "itemCategory",
    "itemType",
  ],
  endpoints: () => ({}),
});
