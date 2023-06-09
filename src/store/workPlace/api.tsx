import { httpBaseQuery } from "@/services/axios";
import { IVacancy, VacancyStatus } from "@/types/Vacancy";
import { IWorkPlace } from "@/types/WorkPlace";
import { createApi } from "@reduxjs/toolkit/query/react";

export const workPlacesApi = createApi({
  reducerPath: "workPlacesApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["workPlaces", "detailedWorkPlace"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getWorkPlaces: builder.query<IWorkPlace[], GetWorkPlacesParams>({
      query: (params) => {
        let url = `v1/work-places/`;

        if (params.trainee_id) {
          url += `?&trainee=${params.trainee_id}`;
        }
        return {
          url,
          method: "GET",
        };
      },
    }),

    getWorkPlaceByTraineeId: builder.query<IWorkPlace, number>({
      query: (traineeId) => ({
        url: `v1/work-places/${traineeId}/by-trainee/`,
        method: "GET",
      }),
    }),

    getWorkPlaceById: builder.query<IWorkPlace, number>({
      query: (id) => ({
        url: `v1/work-places/${id}/`,
        method: "GET",
      }),
      providesTags: ["detailedWorkPlace"],
    }),

    updateWorkPlaceById: builder.mutation<
      IWorkPlace,
      UpdateWorkPlaceByIdParams
    >({
      query: ({ id, ...params }) => ({
        url: `v1/work-places/${id}/`,
        method: "PATCH",
        data: params,
      }),
      invalidatesTags: ["detailedWorkPlace"],
    }),

    currentWorkPlace: builder.query<IWorkPlace, void>({
      query: () => ({ url: `v1/work-places/current/`, method: "GET" }),
    }),
  }),
});

export const {
  useGetWorkPlaceByTraineeIdQuery,
  useCurrentWorkPlaceQuery,
  useGetWorkPlaceByIdQuery,
  useUpdateWorkPlaceByIdMutation,
  useGetWorkPlacesQuery,
} = workPlacesApi;

interface UpdateWorkPlaceByIdParams {
  id: number;
  is_active?: boolean;
}

interface GetWorkPlacesParams {
  trainee_id?: number;
}
