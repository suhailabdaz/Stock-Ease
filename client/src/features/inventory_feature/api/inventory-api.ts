import { apiSlice } from '../../../api/api-slice';
import { AddProductFormValues, AddProductResponse, EditProductRequest,Product } from '../types/interface';

export const inventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<AddProductResponse, AddProductFormValues>({
      query: (data) => ({
        url: '/inventory/products',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: '/inventory/products',
        method: 'GET',
        credentials: 'include' as const,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Products' as const, _id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    editProduct: builder.mutation<Product, EditProductRequest>({
      query: ({ _id, ...data }) => ({
        url: `/inventory/products/${_id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Products', _id }],
    }),
    blockProduct: builder.mutation<Product, string>({
      query: (_id) => ({
        url: `/inventory/products/${_id}/block`,
        method: 'PATCH',
        credentials: 'include' as const,
      }),
      invalidatesTags: (_result, _error, _id) => [{ type: 'Products', _id }],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useEditProductMutation,
  useBlockProductMutation
} = inventApi;