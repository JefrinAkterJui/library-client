import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-api-rosy.vercel.app/api' }),
  tagTypes: ['BookList', 'Book'],

  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => `/books`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({ type: 'Book', id: _id })),
              { type: 'BookList' },
            ]
          : [{ type: 'BookList' }],
    }),
    getSingleBook: build.query({
      query: (id) => `/books/${id}`,
      providesTags: (id) => [{ type: 'Book', id }],
    }),
    createBook: build.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData
      }),
      invalidatesTags: [{ type: 'BookList' }],
    }),
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: 'BookList' }],
    }),
    editBook: build.mutation({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (arg) => [{ type: 'Book', id: arg.id }],
    }),
    borrowBook: build.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData
      }),
      invalidatesTags: [{ type: 'BookList' }, { type: 'Book' }],
    }),
    getBorrowSummery: build.query({
      query: () => `/borrow`,
      providesTags: [{ type: 'BookList' }],
    }),
  }),
});

export const {
  useGetAllBooksQuery, 
  useGetSingleBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummeryQuery,
} = baseApi;