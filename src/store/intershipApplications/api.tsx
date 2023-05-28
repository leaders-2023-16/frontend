import { createApi } from "@reduxjs/toolkit/query/react";
import { httpBaseQuery } from "@/services/axios";
import {
  IIntershipApplication,
  IntershipApplicationStatus,
} from "@/types/IntershipApplication";

export const intershipApplicationsApi = createApi({
  reducerPath: "intershipApplicationsApi",

  baseQuery: httpBaseQuery(),
  tagTypes: ["intershipApplications", "detailedInternshipApplication"],

  refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    getIntershipApplications: builder.query<
      GetIntershipApplicationsResponse,
      GetIntershipApplicationsParams
    >({
      query: (params) => {
        let url = `v1/internship-applications/?limit=${10}&offset=${
          10 * (params.page - 1)
        }`;

        if (params.is_recommended) {
          url += "&is_recommended=true";
        }

        if (params.status) {
          url += `&status=${params.status}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["intershipApplications"],
    }),

    getIntershipApplication: builder.query<IIntershipApplication, number>({
      query: (applicantId) => ({
        url: `v1/internship-applications/${applicantId}/`,
        method: "GET",
      }),
      providesTags: ["detailedInternshipApplication"],
    }),

    submitIntershipApplication: builder.mutation<IIntershipApplication, number>(
      {
        query: (direction) => ({
          url: `v1/internship-applications/`,
          method: "POST",
          data: { direction },
        }),
        invalidatesTags: ["intershipApplications", 'detailedInternshipApplication'],
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
      invalidatesTags: [
        "intershipApplications",
        "detailedInternshipApplication",
      ],
    }),

    endUpSelection: builder.mutation({
      query: () => ({
        url: `v1/internship-applications/end-up-selection`,
        method: "POST",
      }),
      invalidatesTags: [
        "intershipApplications",
        "detailedInternshipApplication",
      ],
    }),
  }),
});
export const {
  useGetIntershipApplicationQuery,
  useGetIntershipApplicationsQuery,
  useSubmitIntershipApplicationMutation,
  useUpdateIntershipApplicationMutation,
  useEndUpSelectionMutation,
} = intershipApplicationsApi;

interface GetIntershipApplicationsParams {
  is_recommended?: true;
  status?: IntershipApplicationStatus;
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
