import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants/api_urls";


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: `${baseUrl}/products` }),
   
   
    endpoints: (builder) => ({
        
        getAllProducts: builder.query({
            query: (q) => ({
               url: '/' ,
               method: 'GET'
            })
        }),
        
        getProductById: builder.query({
            query: (id) => ({
               url: `/${id}` ,
               method: 'GET'
            })
        }),


        addProduct: builder.mutation({
            query: (q) => ({
              url: '/',
              body: q.body,
              headers: {
                Authorization: q.token
              },
              method: 'POST',
            })
          }),


          updateProduct: builder.mutation({
            query: (q) => ({
              url: `/${q.id}`,
              body: q.body,
              headers: {
                Authorization: q.token
              },
              method: 'PATCH',
            })
          }),

        removeProductById: builder.mutation({
            query: (q) => ({
              url: `/${q.id}`,
              headers: {
                Authorization: q.token
              },
              method: 'DELETE',
            })
          })

    })
});

export const { useGetAllProductsQuery, useGetProductByIdQuery, useAddProductMutation, useRemoveProductByIdMutation, useUpdateProductMutation} = productApi;