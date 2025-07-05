import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-api-rosy.vercel.app/api' }),
  tagTypes:["books"],
  endpoints: (build) => ({
    getBook: build.query({
      query: () => `/books`,
      providesTags:["books"]
    }),
    createBook: build.mutation({
      query: (bookData) => ({
        url:"/books",
        method: "POST",
        body: bookData
      }),
      invalidatesTags:["books"]
    }),
    deleteBook: build.mutation({
       query:(id)=>({
          url:`/books/${id}`,
          method: "DELETE"
       }),
       invalidatesTags:["books"]
    })
  }),
});

export const { useGetBookQuery, useCreateBookMutation , useDeleteBookMutation } = baseApi;