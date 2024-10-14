import { apiSlice } from "../../../api/api-slice";
import { logout } from "../../../stores/userSlice";
import { RegistrationData,RegistrationResponse } from "../types/Interfaces";


const invalidateTagAfterDelay = (tag: any, delay: number) => {
  setTimeout(() => {
    authApi.util.invalidateTags([tag]);
  }, delay);
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          invalidateTagAfterDelay('create', 10000);
        } catch(e) {
            console.log(e);
            
        }
      },
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          invalidateTagAfterDelay('login', 10000);
        } catch(e) {
            console.log(e);
            
        }
      },
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "auth-service/auth/logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { dispatch,queryFulfilled }) {
        try {
          dispatch(logout());
          await queryFulfilled;
          invalidateTagAfterDelay('logout', 10000);
        } catch (error: any) {
          dispatch(logout());
          console.error("Error during logout:", error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogOutMutation } = authApi;

