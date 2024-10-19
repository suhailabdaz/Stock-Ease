import { apiSlice } from '../../../api/api-slice';
import { CreateOrderFormValues, CreateOrderResponse, AllOrderResponse, EditOrderRequest, SingleOrderResponse, AllCustomersResponse, AllProductsResponse, SingleOrderRequest } from '../types/interface';

export const salesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderFormValues>({
      query: (data) => ({
        url: '/order/orders',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      invalidatesTags: [{ type: 'Sales', id: 'LIST' }],
    }),
    getOrders: builder.query<AllOrderResponse , string>({
      query: (vendorid:string) => ({
        url: `/order/orders/${vendorid}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.orders?.map(({ _id }) => ({ type: 'Sales' as const, _id })),
              { type: 'Sales', id: 'LIST' },
            ]
          : [{ type: 'Sales', id: 'LIST' }],
    }),
    getSingleOrder: builder.query<SingleOrderResponse,SingleOrderRequest>({
      query: ({vendorid,orderid}) => ({
        url: `/order/single-order/${vendorid}/${orderid}`,  
        method: 'GET',
        credentials: 'include' as const, 
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Sales' as const, id: result.order._id }]  
          : [{ type: 'Sales', _id: 'LIST' }],
    }),
    editOrder: builder.mutation<SingleOrderResponse, EditOrderRequest>({
      query: ({ vendorid,_id, status }) => ({
        url: `/order/orders/${vendorid}/${_id}`,
        method: 'PATCH',
        body: {status},
        credentials: 'include' as const,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Sales', _id }],
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
    getProducts: builder.query<AllProductsResponse , string>({
      query: (vendorid) => ({
        url: `/inventory/products/${vendorid}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products?.map(({ _id }) => ({ type: 'Products' as const, _id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useEditOrderMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useGetCustomersQuery,
  useGetProductsQuery
} = salesApi;