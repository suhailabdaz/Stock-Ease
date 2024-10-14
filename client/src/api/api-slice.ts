import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DEV_SERVER_URI ,
  }),
  tagTypes: ['login,logout,create'],
  endpoints: (_builder) => ({}),
});

