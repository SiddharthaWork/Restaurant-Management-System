import { baseApi } from "./baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    getMyProfile: builder.query({
      query: () => "user/profile/me",
    }),
    getAllUsers: builder.query({
      query: () => "user/profile",
    }),
  }),
});
export const {
  useLoginMutation,
  useLazyGetMyProfileQuery,
  useGetAllUsersQuery,
} = authApi;
