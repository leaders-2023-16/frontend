import { httpBaseQuery } from "@/services/axios";
import { IVacancy, IVacancyTestTask, VacancyStatus } from "@/types/Vacancy";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["vacancies", "detailedVacancy"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getVacancies: builder.query<GetVacanciesResponse, GetVacanciesParams>({
      query: (params) => {
        let url = `v1/vacancies/?limit=${params.limit ?? 10}&offset=${(params.page - 1) * (params.limit ?? 10)}`;

        if (params.status) {
          url += `&status=${params.status}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["vacancies"],
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
      invalidatesTags: ["vacancies"],
    }),

    getVacancyById: builder.query<IVacancy, number>({
      query: (id) => ({
        url: `v1/vacancies/${id}/`,
        method: "GET",
      }),
      providesTags: ["detailedVacancy"],
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
      invalidatesTags: ["vacancies", "detailedVacancy"],
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
  limit?: number;
  status?: VacancyStatus;
}

interface GetVacanciesResponse {
  results: IVacancy[];
  count: number;
}
