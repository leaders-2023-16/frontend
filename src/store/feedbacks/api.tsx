import { httpBaseQuery } from "@/services/axios";
import { ICountry } from "@/types/Country";
import { IDepartment } from "@/types/Department";
import { IFeedback } from "@/types/Feedback";
import { IReport } from "@/types/Report";
import { createApi } from "@reduxjs/toolkit/query/react";

export const feedbacksApi = createApi({
  reducerPath: "feedbacksApi",
  baseQuery: httpBaseQuery(),
  tagTypes: ["feedbacks"],
  endpoints: (builder) => ({
    getFeedbacks: builder.query<IFeedback[], GetFeedbacksParams>({
      query: (params) => {
        let url = `v1/feedbacks/?`;

        if (params.to_user) {
          url += `to_user=${params.to_user}&`;
        }

        if (params.from_user) {
          url += `from_user=${params.from_user}&`;
        }

        return { url, method: "GET" };
      },
      providesTags: ["feedbacks"],
    }),

    postFeedback: builder.mutation<
      IFeedback,
      Pick<IFeedback, "rating" | "text"> & { to_user: number }
    >({
      query: (data) => ({
        url: `v1/feedbacks/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["feedbacks"],
    }),
  }),
});

export const { useGetFeedbacksQuery, usePostFeedbackMutation } = feedbacksApi;

interface GetFeedbacksParams {
  to_user?: number;
  from_user?: number;
}
