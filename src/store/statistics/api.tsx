import { httpBaseQuery } from "@/services/axios";
import { ICountry } from "@/types/Country";
import { IDepartment } from "@/types/Department";
import { IStatistic } from "@/types/Statistic";
import { createApi } from "@reduxjs/toolkit/query/react";

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: httpBaseQuery(),
  endpoints: (builder) => ({
    getStatistic: builder.query<IStatistic, void>({
      query: () => ({ url: `v1/statistics/`, method: "GET" }),
    }),
  }),
});

export const { useGetStatisticQuery } = statisticsApi;
