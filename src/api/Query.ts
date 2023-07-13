import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store/store";
import { AdminEndpoints } from "../constants/ApiEndPoints";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logOutAdmin } from "../features/adminSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).admin.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      api.dispatch(logOutAdmin());
    }

    return result;
  },
  {
    maxRetries: 0,
  }
);

export const IzyAdminApis = createApi({
  reducerPath: "izyAdminApi",
  baseQuery: staggeredBaseQueryWithBailOut,
  tagTypes: ["Media", "Blog", "Pages"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: AdminEndpoints.ADMIN_LOGIN,
        method: "POST",
        body,
      }),
    }),

    // blogs endpoints
    postBlog: builder.mutation<string, any>({
      query: ({ data, params }) => ({
        url: `${AdminEndpoints.ADD_BLOG}`,
        params,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Blog"],
    }),
    getBlogs: builder.query<any, any>({
      query: (params) => ({
        url: `${AdminEndpoints.GET_BLOGS}`,
        method: "GET",
        params,
      }),
      providesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation<void, any>({
      query: (reference) => ({
        url: `${AdminEndpoints.DELETE_BLOG}?reference=${reference}`,
        params: reference,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    // media endpoints
    uploadMedia: builder.mutation({
      query: (body) => ({
        url: AdminEndpoints.UPLOAD_IMAGE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Media"],
    }),
    getImagesList: builder.query<any, any>({
      query: () => ({
        url: AdminEndpoints.GET_IMAGE,
        method: "GET",
      }),
      providesTags: ["Media"],
    }),
    deleteMedia: builder.mutation({
      query: (params) => ({
        url: AdminEndpoints.DELETE_IMAGE,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["Media"],
    }),

    // pages endpoint
    addPage: builder.mutation({
      query: (body) => ({
        url: AdminEndpoints.ADD_PAGE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Pages"],
    }),
    updatePage: builder.mutation({
      query: ({ params, body }) => ({
        url: AdminEndpoints.ADD_PAGE,
        method: "PUT",
        params,
        body,
      }),
      invalidatesTags: ["Pages"],
    }),
    getPages: builder.query<any, any>({
      query: (params) => ({
        url: AdminEndpoints.GET_PAGES,
        method: "GET",
        params,
      }),
      providesTags: ["Pages"],
    }),
    deletePages: builder.mutation({
      query: (params) => ({
        url: AdminEndpoints.DELETE_PAGES,
        params,
        method: "DELETE",
      }),
      invalidatesTags: ["Pages"],
    }),
  }),
});
