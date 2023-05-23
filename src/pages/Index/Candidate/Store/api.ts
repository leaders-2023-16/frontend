import { createApi } from "@reduxjs/toolkit/query/react";
import { httpBaseQuery } from "@/services/axios";
import { SubmitApplicationStatusInfo } from "./types";

export const candidateIndexPageApi = createApi({
  reducerPath: "candidateIndexPageApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["submitApplicationStatus"],
  endpoints: (builder) => ({
    submitApplicationStatus: builder.mutation<void, number>({
      query: (direction) => ({
        url: `v1/internship-applications/`,
        method: "POST",
        data: { direction },
      }),
      invalidatesTags: ["submitApplicationStatus"],
    }),
    getSubmitApplicationStatus: builder.query<
      SubmitApplicationStatusInfo,
      string
    >({
      query: (user_id) => ({
        url: `v1/internship-applications/${user_id}/`,
        method: "GET",
      }),
      providesTags: ["submitApplicationStatus"],
    }),
  }),
});
export const {
  useGetSubmitApplicationStatusQuery,
  useSubmitApplicationStatusMutation,
} = candidateIndexPageApi;
