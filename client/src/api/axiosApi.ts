import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:8050' ,
});

const invalidateTagAfterDelay = (tag: any, delay: number) => {
  setTimeout(() => {
    aadharApi.util.invalidateTags([tag]);
  }, delay);
};

export const aadharApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: ['parse'],
  endpoints: (builder) => ({
    parseAadhar: builder.mutation({
      query: (images: { frontImage: File, backImage: File }) => {
        const formData = new FormData();
        formData.append('frontImage', images.frontImage); 
        formData.append('backImage', images.backImage);  

        return {
          url: '/api/v1/parse-aadhar', 
          method: 'POST',
          body: formData, 
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          invalidateTagAfterDelay('parse', 10000);
        } catch(e) {
            console.log(e);
            
        }
      },
    }),
  }),
});

export const { useParseAadharMutation } = aadharApi;

export default aadharApi;
