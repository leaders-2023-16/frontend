import { httpBaseQuery } from "@/services/axios";
import { IUser, UserRole } from "@/types/User";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], GetUsersParams>({
      query: (params) => ({
        url: `v1/users/?role=${params.role}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

interface GetUsersParams {
  role: UserRole;
}
