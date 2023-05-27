import { httpBaseQuery } from "@/services/axios";
import { IVacancy, IVacancyTestTask, VacancyStatus } from "@/types/Vacancy";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["vacancies"],
  endpoints: (builder) => ({
    getVacancies: builder.query<IVacancy[], GetVacanciesParams>({
      query: (params) => {
        let url = `v1/vacancies/?limit=10&offset=${(params.page - 1) * 10}`;

        if (params.status) {
          url += `&status=${params.status}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (response: GetVacanciesResponse) => response.results,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
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
        "name" | "description" | "status" | "schedule"
      > & {
        direction: number;
        mentor: number;
        test_task: Pick<
          Required<IVacancy>["test_task"],
          "title" | "description" | "type"
        >;
        required_qualifications: string[];
      }
    >({
      query: (data) => ({
        url: `v1/vacancies/`,
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "vacancies", id: "LIST" }],
    }),

    getVacancyById: builder.query<IVacancy, number>({
      query: (id) => ({
        url: `v1/vacancies/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "vacancies", id }],
    }),

    updateVacancy: builder.mutation<
      IVacancy,
      Partial<
        Pick<Required<IVacancy>, "name" | "description" | "status" | "schedule">
      > & {
        id: number;
        direction?: number;
        mentor?: number;
        test_task?: Omit<IVacancyTestTask, "id">;
        required_qualifications?: string[];
      }
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
  useGetVacancyByIdQuery,
} = vacanciesApi;

interface GetVacanciesParams {
  page: number;
  status?: VacancyStatus;
}

interface GetVacanciesResponse {
  results: IVacancy[];
  total: number;
}
