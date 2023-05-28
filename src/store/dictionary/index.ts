import { httpBaseQuery } from "@/services/axios";
import { ICountry } from "@/types/Country";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dictionaryApi = createApi({
  reducerPath: "dictionaryApi",
  baseQuery: httpBaseQuery(),
  endpoints: (builder) => ({
    getCountires: builder.query<ICountry[], void>({
      query: () => ({ url: `v1/countries/`, method: "GET" }),
    }),

    getCountryById: builder.query<ICountry, number>({
      query: (countryId) => ({
        url: `v1/countries/${countryId}`,
        method: "GET",
      })
    }),

    getDepartments: builder.query<{ id: number; name: string }[], void>({
      query: () => ({ url: `v1/departments/`, method: "GET" }),
    }),
  }),
});

export const {
  useGetCountiresQuery,
  useGetCountryByIdQuery,
  useGetDepartmentsQuery,
} = dictionaryApi;

interface GetCountriesResponse {
  results: ICountry[];
  total: number;
}
