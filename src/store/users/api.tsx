import { httpBaseQuery } from "@/services/axios";
import { IUser, UserRole } from "@/types/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["users", "freeMentors"],

  refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], GetUsersParams>({
      query: (params) => ({
        url: `v1/users/?role=${params.role}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getFreeMentors: builder.query<IUser[], void>({
      query: () => ({
        url: `v1/users/free-mentors/`,
        method: "GET",
      }),
      providesTags: ["freeMentors"],
    }),
  }),
});

export const { useGetUsersQuery, useGetFreeMentorsQuery } = usersApi;

interface GetUsersParams {
  role: UserRole;
}
