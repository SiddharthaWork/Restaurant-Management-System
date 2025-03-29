import { baseApi } from "./baseApi";

const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReservationType: builder.query({
      query: () => "reservation/type",
      providesTags: ["reservationType"],
    }),
    createReservationType: builder.mutation({
      query: (body) => ({ url: "reservation/type", body, method: "POST" }),
      invalidatesTags: ["reservationType"],
    }),
    deleteReservationType: builder.mutation({
      query: (id) => ({
        url: `reservation/type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservationType"],
    }),
  }),
});
export const {
  useCreateReservationTypeMutation,
  useGetAllReservationTypeQuery,
  useDeleteReservationTypeMutation,
} = reservationApi;
