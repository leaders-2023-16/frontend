import { createApi } from "@reduxjs/toolkit/query/react";
import { httpBaseQuery } from "../../services/axios";
import { IPatchTraineeProfile, ITraineeProfile } from "@/types/TraineeProfile";

export const traineeProfileApi = createApi({
  reducerPath: "traineeProfileApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["traineeProfile"],
  endpoints: (builder) => ({
    getTraineeProfileById: builder.query<ITraineeProfile, number>({
      query: (user_id) => ({
        url: `v1/users/trainee-profiles/${user_id}/`,
        method: "GET",
      }),
      providesTags: ["traineeProfile"],
    }),
    updateTraineeProfileById: builder.mutation<
      ITraineeProfile,
      { id: number; data: Partial<IPatchTraineeProfile> }
    >({
      query: ({ id, data }) => ({
        url: `v1/users/trainee-profiles/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["traineeProfile"],
    }),
  }),
});
export const {
  useGetTraineeProfileByIdQuery,
  useUpdateTraineeProfileByIdMutation,
} = traineeProfileApi;
