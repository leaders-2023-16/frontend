import { httpBaseQuery } from "@/services/axios";
import { IVacancy, IVacancyTestTask } from "@/types/Vacancy";
import { IVacancyResponse } from "@/types/VacancyResponse";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vacancyResponsesApi = createApi({
  reducerPath: "vacancyResponsesApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["vacanсyResponses"],
  endpoints: (builder) => ({
    getVacancyResponses: builder.query<
      IVacancyResponse[],
      GetVacancyResponseParams
    >({
      query: (params) => ({
        url: `v1/vacancy-response/?limit=10&offset=${(params.page - 1) * 10}`,
        method: "GET",
      }),
      transformResponse: (response: GetVacancyResponseResponse) =>
        response.results,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "vacanсyResponses" as const,
                id,
              })),
              { type: "vacanсyResponses", id: "LIST" },
            ]
          : [{ type: "vacanсyResponses", id: "LIST" }],
    }),
    // createVacancy: builder.mutation<
    //   IVacancy,
    //   Pick<
    //     Required<IVacancy>,
    //     "required_qualifications" | "name" | "description" | "status"
    //   > & {
    //     direction: number;
    //     mentor: number;
    //     test_task: Pick<
    //       Required<IVacancy>["test_task"],
    //       "title" | "description" | "type"
    //     >;
    //   }
    // >({
    //   query: (data) => ({
    //     url: `v1/vacancies/`,
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: [{ type: "vacancies", id: "LIST" }],
    // }),

    getVacancyResponseById: builder.query<IVacancyResponse, number>({
      query: (id) => ({
        url: `v1/vacancy-response/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "vacanсyResponses", id }],
    }),

    updateVacancyResponse: builder.mutation<
      IVacancy,
      Partial<
        Pick<Required<IVacancyResponse>, "text_answer" | "covering_letter">
      > & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `v1/vacancy-response/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "vacanсyResponses", id: params.id },
      ],
    }),
  }),
});

export const {
  useGetVacancyResponseByIdQuery,
  useGetVacancyResponsesQuery,
  useUpdateVacancyResponseMutation,
} = vacancyResponsesApi;

interface GetVacancyResponseParams {
  page: number;
}

interface GetVacancyResponseResponse {
  results: IVacancyResponse[];
  total: number;
}
