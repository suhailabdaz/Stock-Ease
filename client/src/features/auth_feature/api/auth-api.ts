import { apiSlice } from '../../../api/api-slice';
import { logout } from '../../../stores/userSlice';
import { LoginFormValues, loginResponse, RegistrationData, RegistrationResponse, verifyOtpReq } from '../types/Interfaces';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),

    login: builder.mutation<loginResponse,LoginFormValues>({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: {
          email,
          password,
        },
        credentials: 'include' as const,
      }),
    }),

    verfyOtp: builder.mutation<RegistrationResponse, verifyOtpReq>({
      query: ({ email, otp }) => ({
        url: 'auth/verifyotp',
        method: 'POST',
        body: {
          email,
          otp,
        },
        credentials: 'include' as const,
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include' as const,
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(logout());
        } catch (error: any) {
          dispatch(logout());
          console.error('Error during logout:', error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogOutMutation,useVerfyOtpMutation } =
  authApi;
