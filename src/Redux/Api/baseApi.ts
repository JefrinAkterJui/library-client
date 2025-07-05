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
    }),
    getSingleBook: build.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'books', id }],
    }),
    borrowBook: build.mutation({
      query:(borrowData)=>({

        url: "/borrow",
        method: "POST",
        body: borrowData
      }),
      invalidatesTags:["books"]
    }),
    getBorrowSummery: build.query({
      query: () => `/borrow`,
      providesTags:["books"]
    }),
  }),
});

export const { 
  useGetBookQuery, 
  useCreateBookMutation, 
  useDeleteBookMutation, 
  useBorrowBookMutation 
} = baseApi;