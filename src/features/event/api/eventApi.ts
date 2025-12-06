import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/appConfiguration/service/axiosClient";
import { RawEventContainer } from "../types/rawServerResponseTypes";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    searchEvents: builder.query<RawEventContainer, { search?: string, keyword?: string , locale?: string }>({
      query: ({ keyword, search, locale }) => ({
        url: "/events.json",
        method: "get",
        params: { keyword, search, locale},
      }),
    }),
  }),
});

export const { useSearchEventsQuery } = homeApi;
