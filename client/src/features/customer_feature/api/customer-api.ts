import { apiSlice } from '../../../api/api-slice';
import { AddCustomerFormValues, AddCustomerResponse, AllCustomersResponse, EditCustomerRequest, SingleCustomerResponse } from '../types/interface';

export const custApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation<AddCustomerResponse, AddCustomerFormValues>({
      query: (data) => ({
        url: '/customer/customers',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getCustomers: builder.query<AllCustomersResponse , void>({
      query: () => ({
        url: '/customer/customers',
        method: 'GET',
        credentials: 'include' as const,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.customers?.map(({ _id }) => ({ type: 'Customers' as const, _id })),
              { type: 'Customers', id: 'LIST' },
            ]
          : [{ type: 'Customers', id: 'LIST' }],
    }),
    getSingleCustomer: builder.query<SingleCustomerResponse, string>({
      query: (id) => ({
        url: `/customer/single-customer/${id}`,  
        method: 'GET',
        credentials: 'include' as const, 
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Customers' as const, id: result.customer._id }]  
          : [{ type: 'Customers', _id: 'LIST' }],
    }),
    editCustomer: builder.mutation<SingleCustomerResponse, EditCustomerRequest>({
      query: ({ _id, ...data }) => ({
        url: `/customer/customers/${_id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Customers', _id }],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useEditCustomerMutation,
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
} = custApi;