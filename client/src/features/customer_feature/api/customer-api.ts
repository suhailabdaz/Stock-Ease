import { apiSlice } from '../../../api/api-slice';
import { AddCustomerFormValues, AddCustomerResponse, AllCustomersResponse, EditCustomerRequest, SingleCustomerResponse, SingleCustRequest } from '../types/interface';

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
    getCustomers: builder.query<AllCustomersResponse , string>({
      query: (vendorid) => ({
        url: `/customer/customers/${vendorid}`,
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
    getSingleCustomer: builder.query<SingleCustomerResponse, SingleCustRequest>({
      query: ({vendorid,customerid}) => ({
        url: `/customer/single-customer/${vendorid}/${customerid}`,  
        method: 'GET',
        credentials: 'include' as const, 
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Customers' as const, id: result.customer._id }]  
          : [{ type: 'Customers', _id: 'LIST' }],
    }),
    editCustomer: builder.mutation<SingleCustomerResponse, EditCustomerRequest>({
      query: ({ vendorid,_id, ...data }) => ({
        url: `/customer/customers/${vendorid}/${_id}`,
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