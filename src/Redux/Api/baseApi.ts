import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes:["books"],
  endpoints: (build) => ({
    getBook: build.query({
      query: () => `/books`,
      providesTags:["books"]
    }),
    createBook: build.mutation({
      query: (taskData) => ({
        url:"/books",
        method: "POST",
        body: taskData
      }),
      invalidatesTags:["books"]
    }),
  }),
});

export const { useGetBookQuery, useCreateBookMutation} = baseApi;