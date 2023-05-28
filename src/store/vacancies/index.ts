import { createApi } from "@reduxjs/toolkit/query/react";
import { httpBaseQuery } from "../../services/axios";
import { IPatchTraineeProfile, ITraineeProfile } from "@/types/TraineeProfile";
import { IVacancy } from "@/types/Vacanvies";
import { PaginationRequest, PaginationResponse } from "@/types/commonTypes";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: httpBaseQuery(),
  // tagTypes: ["vacancies"],
  endpoints: (builder) => ({
    getVacancies: builder.query<
      PaginationResponse<IVacancy[]>,
      PaginationRequest
    >({
      query: ({ limit, offset }) => ({
        url: `v1/vacancies/`,
        method: "GET",
        params: { limit, offset },
      }),
      // providesTags: ["vacancies"],
    }),
  }),
});
export const { useGetVacanciesQuery } = vacanciesApi;
