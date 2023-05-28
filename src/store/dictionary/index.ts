import { httpBaseQuery } from "@/services/axios";
import { ICountry } from "@/types/Country";
import { IDepartment } from "@/types/Department";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dictionaryApi = createApi({
  reducerPath: "dictionaryApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["countries"],
  endpoints: (builder) => ({
    getCountires: builder.query<ICountry[], void>({
      query: () => ({ url: `v1/countries/`, method: "GET" }),
      transformResponse: (response: GetCountriesResponse) => response.results,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "countries" as const,
                id,
              })),
              { type: "countries", id: "LIST" },
            ]
          : [{ type: "countries", id: "LIST" }],
    }),

    getCountryById: builder.query<ICountry, number>({
      query: (countryId) => ({
        url: `v1/countries/${countryId}`,
        method: "GET",
      }),
      providesTags: (result, error, applicantId) => [
        { type: "countries", id: applicantId },
      ],
    }),

    getDepartments: builder.query<IDepartment[], void>({
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
