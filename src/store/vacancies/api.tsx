import { httpBaseQuery } from "@/services/axios";
import { IVacancy } from "@/types/Vacancy";
import { PaginationResponse } from "@/types/commonTypes";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["vacancies"],
  endpoints: (builder) => ({
    getVacancies: builder.query<PaginationResponse<IVacancy[]>, GetVacanciesParams>({
      query: (params) => ({
        url: `v1/vacancies/?limit=${params.limit ?? 10}&offset=${(params.page - 1) * (params.limit ?? 10)}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "vacancies" as const,
                id,
              })),
              { type: "vacancies", id: "LIST" },
            ]
          : [{ type: "vacancies", id: "LIST" }],
    }),
    createVacancy: builder.mutation<
      IVacancy,
      Pick<
        Required<IVacancy>,
        "required_qualifications" | "name" | "description" | "status"
      > & {
        direction: number;
        mentor: number;
        test_task: Pick<
          Required<IVacancy>["test_task"],
          "title" | "description" | "type"
        >;
      }
    >({
      query: (data) => ({
        url: `v1/vacancies/`,
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "vacancies", id: "LIST" }],
    }),

    updateVacancy: builder.mutation<
      IVacancy,
      Partial<
        Pick<
          Required<IVacancy>,
          | "required_qualifications"
          | "name"
          | "description"
          | "status"
          | "test_task"
        >
      > & { id: number; direction: number; mentor: number }
    >({
      query: ({ id, ...data }) => ({
        url: `v1/vacancies/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "vacancies", id: params.id },
      ],
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useUpdateVacancyMutation,
  useCreateVacancyMutation,
} = vacanciesApi;

interface GetVacanciesParams {
  page: number;
  limit?: number
}
