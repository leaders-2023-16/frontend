import { createApi } from '@reduxjs/toolkit/query/react'
import { TraineeProfileType } from './types'
import { httpBaseQuery } from '../../services/axios'

export const traineeProfileApi = createApi({
    reducerPath: 'traineeProfileApi',
    baseQuery: httpBaseQuery(),
    tagTypes: ['traineeProfile'],
    endpoints: (builder) => ({
        getTraineeProfileById: builder.query<TraineeProfileType, number>({
            query: (user_id) => ({ url: `v1/users/trainee-profiles/${user_id}/`, method: 'GET' }),
            providesTags: ['traineeProfile']
        }),
        updateTraineeProfileById: builder.mutation<TraineeProfileType, { id: number, data: Partial<TraineeProfileType> }>({
            query: ({ id, data }) => ({ url: `v1/users/trainee-profiles/${id}/`, method: "PATCH", data }),
            invalidatesTags: ['traineeProfile']
        })
    }),
})
export const { useGetTraineeProfileByIdQuery, useUpdateTraineeProfileByIdMutation } = traineeProfileApi