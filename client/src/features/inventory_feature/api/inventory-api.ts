import { apiSlice } from '../../../api/api-slice';
import { AddProductFormValues, AddProductResponse, AllProductsResponse, EditProductRequest, SingleProductResponse } from '../types/interface';

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
    getProducts: builder.query<AllProductsResponse , void>({
      query: () => ({
        url: '/inventory/products',
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
    getSingleProduct: builder.query<SingleProductResponse, string>({
      query: (id) => ({
        url: `/inventory/single-product/${id}`,  
        method: 'GET',
        credentials: 'include' as const, 
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Products' as const, id: result.product._id }]  
          : [{ type: 'Products', _id: 'LIST' }],
    }),
    editProduct: builder.mutation<SingleProductResponse, EditProductRequest>({
      query: ({ _id, ...data }) => ({
        url: `/inventory/products/${_id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Products', _id }],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useEditProductMutation,
  useGetSingleProductQuery
} = inventApi;