import { httpBaseQuery } from "@/services/axios";
import { IVacancy, IVacancyTestTask } from "@/types/Vacancy";
import { IVacancyResponse } from "@/types/VacancyResponse";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vacancyResponsesApi = createApi({
  reducerPath: "vacancyResponsesApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["vacanсyResponses", "detailedVacancyResponse"],
  endpoints: (builder) => ({
    getVacancyResponses: builder.query<
      GetVacancyResponseResponse,
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

        if (params.vacancy) {
          url += `&vacancy=${params.vacancy}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => ["vacanсyResponses"],
    }),
    respondVacancy: builder.mutation<IVacancyResponse, ResponseVacancyResponse>(
      {
        query: (data) => ({
          url: `v1/vacancy-response/`,
          method: "POST",
          data,
        }),
        invalidatesTags: ["vacanсyResponses", "detailedVacancyResponse"],
      }
    ),

    getVacancyResponseById: builder.query<IVacancyResponse, number>({
      query: (id) => ({
        url: `v1/vacancy-response/${id}/`,
        method: "GET",
      }),
      providesTags: ["detailedVacancyResponse"],
    }),

    getVacancyResponseByVacancyId: builder.query<IVacancyResponse, number>({
      query: (id) => ({
        url: `v1/vacancy-response/${id}/by-vacancy`,
        method: "GET",
      }),
      providesTags: ["detailedVacancyResponse"],
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
      invalidatesTags: ["detailedVacancyResponse"],
    }),

    approveByCurator: builder.mutation<void, number>({
      query: (id) => ({
        url: `v1/vacancy-response/${id}/approve/`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetVacancyResponseByIdQuery,
  useGetVacancyResponsesQuery,
  useUpdateVacancyResponseMutation,
  useGetVacancyResponseByVacancyIdQuery,
  useRespondVacancyMutation,
  useApproveByCuratorMutation,
} = vacancyResponsesApi;

interface GetVacancyResponseParams {
  page: number;

  approvedByApplicant?: boolean;
  approvedByMentor?: boolean;

  vacancy?: number;
}

interface GetVacancyResponseResponse {
  results: IVacancyResponse[];
  count: number;
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
