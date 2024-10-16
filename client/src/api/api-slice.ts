import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../stores/userSlice";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_DEV_SERVER_URI,
  credentials: 'include', 
  prepareHeaders: (headers, {}) => {
    return headers;
  },

});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_SERVER_URI}auth/refresh`,
        {},
        { withCredentials: true } 
      );

      if (response.status === 200) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.href = '/';
      }
    } catch (refreshError) {
      api.dispatch(logout());
      window.location.href = '/';
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['login','logout','create','Products'],
  endpoints: (_builder) => ({}),
});