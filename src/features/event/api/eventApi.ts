import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/appConfiguration/service/axiosClient";
import { RawEventContainer } from "../types/rawTypes";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    searchEvents: builder.query<RawEventContainer, { search?: string, keyword?: string }>({
      query: ({ keyword, search }) => ({
        url: "/events.json",
        method: "get",
        params: { keyword, search },
      }),
    }),
  }),
});

export const { useSearchEventsQuery } = homeApi;
