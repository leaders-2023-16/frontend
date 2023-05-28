import { httpBaseQuery } from "@/services/axios";
import { ICountry } from "@/types/Country";
import { IDepartment } from "@/types/Department";
import { IReport } from "@/types/Report";
import { createApi } from "@reduxjs/toolkit/query/react";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["reports", "detailedReport"],
  endpoints: (builder) => ({
    getReports: builder.query<IReport[], GetReportsParams>({
      query: (params) => {
        let url = `v1/reports/?work_place=${params.work_place}`;

        if (params.date) {
          url += `&date=${params.date}`;
        }

        if (params.date_from) {
          url += `&date_from=${params.date_from}`;
        }

        if (params.date_to) {
          url += `&date_to=${params.date_to}`;
        }

        return { url, method: "GET" };
      },
      providesTags: ["reports"],
    }),

    updateReport: builder.mutation<
      IReport,
      Partial<Pick<IReport, "status" | "is_approved">> & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `v1/reports/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["reports"],
    }),

    submitReport: builder.mutation<
      IReport,
      Pick<IReport, "date" | "is_approved" | "status" | "work_place">
    >({
      query: (data) => ({
        url: `v1/reports/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["reports"],
    }),

    exportReport: builder.mutation<string, unknown>({
      query: () => ({
        url: `v1/reports/export/`,
        method: "GET",
        responseType: 'blob'
      }),
    }),
  }),
});

export const {
  useGetReportsQuery,
  useUpdateReportMutation,
  useSubmitReportMutation,
  useExportReportMutation,
} = reportsApi;

interface GetReportsParams {
  date_from?: string;
  date_to?: string;
  date?: string;
  work_place: number;
}

interface UpdateReportParams {
  id: number;
}
