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
      query: (params) => {
        let url = `v1/vacancy-response/?limit=10&offset=${
          (params.page - 1) * 10
        }`;

        if (typeof params.approvedByMentor === "boolean") {
          url += `&approved_by_mentor=${params.approvedByMentor}`;
        }

        if (typeof params.approvedByApplicant === "boolean") {
          url += `&approved_by_applicant=${params.approvedByApplicant}`;
        }

        return {
          url,
          method: "GET",
        };
      },
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
    respondVacancy: builder.mutation<IVacancyResponse, ResponseVacancyResponse>(
      {
        query: (data) => ({
          url: `v1/vacancy-response/`,
          method: "POST",
          data,
        }),
        invalidatesTags: [{ type: "vacanсyResponses", id: "LIST" }],
      }
    ),

    getVacancyResponseById: builder.query<IVacancyResponse, number>({
      query: (id) => ({
        url: `v1/vacancy-response/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "vacanсyResponses", id }],
    }),

    getVacancyResponseByVacancyId: builder.query<IVacancyResponse, number>({
      query: (id) => ({
        url: `v1/vacancy-response/${id}/by-vacancy`,
        method: "GET",
      }),
      providesTags: (result, error, id) =>
        result
          ? [{ type: "vacanсyResponses", id: result.id }]
          : [{ type: "vacanсyResponses" }],
    }),

    updateVacancyResponse: builder.mutation<
      IVacancy,
      Partial<
        Pick<
          Required<IVacancyResponse>,
          | "text_answer"
          | "covering_letter"
          | "approved_by_mentor"
          | "approved_by_applicant"
        >
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
  useGetVacancyResponseByVacancyIdQuery,
  useRespondVacancyMutation,
} = vacancyResponsesApi;

interface GetVacancyResponseParams {
  page: number;

  approvedByApplicant?: boolean;
  approvedByMentor?: boolean;
}

interface GetVacancyResponseResponse {
  results: IVacancyResponse[];
  total: number;
}

type ResponseVacancyResponse = Partial<
  Pick<
    IVacancyResponse,
    | "text_answer"
    | "covering_letter"
    | "approved_by_mentor"
    | "approved_by_applicant"
  >
> & { vacancy: number };
