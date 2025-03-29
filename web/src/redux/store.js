import { configureStore } from "@reduxjs/toolkit";
import configUser from "./slices/configUser";
import { baseApi } from "./api/baseApi";
export const store = configureStore({
  reducer: {
    configUser,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
