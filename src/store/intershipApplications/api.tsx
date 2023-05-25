import { createApi } from "@reduxjs/toolkit/query/react";
import { httpBaseQuery } from "@/services/axios";
import { IIntershipApplication } from "@/types/IntershipApplication";

export const intershipApplicationsApi = createApi({
  reducerPath: "intershipApplicationsApi",

  baseQuery: httpBaseQuery(),
  tagTypes: ["intershipApplications"],

  endpoints: (builder) => ({
    getIntershipApplications: builder.query<
      IIntershipApplication[],
      GetIntershipApplicationsParams
    >({
      query: (params) => {
        let url = `v1/internship-applications/?limit=${10}&offset=${
          10 * (params.page - 1)
        }`;

        if (params.is_recommended) {
          url += "is_recommended=true";
        }

        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (response: GetIntershipApplicationsResponse) =>
        response.results.map((item) => ({
          ...item,
          _id: item.applicant.id,
        })) as any,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "intershipApplications" as const,
                id: _id,
              })),
              { type: "intershipApplications", id: "LIST" },
            ]
          : [{ type: "intershipApplications", id: "LIST" }],
    }),

    getIntershipApplication: builder.query<IIntershipApplication, number>({
      query: (applicantId) => ({
        url: `v1/internship-applications/${applicantId}/`,
        method: "GET",
      }),
      transformResponse: (response: GetDetailedIntershipApplicationResponse) =>
        ({ ...response, _id: response.applicant.id } as any),
      providesTags: (result, error, applicantId) => [
        { type: "intershipApplications", id: applicantId },
      ],
    }),

    submitIntershipApplication: builder.mutation<IIntershipApplication, number>(
      {
        query: (direction) => ({
          url: `v1/internship-applications/`,
          method: "POST",
          data: { direction },
        }),
        invalidatesTags: [{ type: "intershipApplications", id: "LIST" }],
      }
    ),

    updateIntershipApplication: builder.mutation<
      IIntershipApplication,
      Partial<Pick<IIntershipApplication, "status" | "direction">> & {
        applicantId: number;
      }
    >({
      query: ({ applicantId, ...data }) => ({
        url: `v1/internship-applications/${applicantId}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "intershipApplications", id: params.applicantId },
      ],
    }),
  }),
});
export const {
  useGetIntershipApplicationQuery,
  useGetIntershipApplicationsQuery,
  useSubmitIntershipApplicationMutation,
  useUpdateIntershipApplicationMutation,
} = intershipApplicationsApi;

interface GetIntershipApplicationsParams {
  is_recommended?: true;
  page: number;
}

interface GetIntershipApplicationsResponse {
  count: number;
  results: IIntershipApplication[];
}

type GetDetailedIntershipApplicationResponse = Omit<
  IIntershipApplication,
  "_id"
>;
