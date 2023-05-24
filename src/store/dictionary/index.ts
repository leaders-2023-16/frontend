import { httpBaseQuery } from '@/services/axios'
import { createApi } from '@reduxjs/toolkit/query/react'

export const dictionaryApi = createApi({
    reducerPath: 'dictionaryApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getCountires: builder.query<{id: number, name: string}[], void>({
            query: () => ({ url: `v1/countries/`, method: 'GET' }),
        }),
        getDepartments: builder.query<{id: number, name: string}[], void>({
            query: () => ({ url: `v1/departments/`, method: "GET" }),
        })
    }),
})
export const { useGetCountiresQuery, useGetDepartmentsQuery } = dictionaryApi