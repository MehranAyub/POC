import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../Api/agent.ts";

export const TimeSheetApi = createApi({
  reducerPath: "TimeSheetApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getTimeSheets: build.query<any, void>({
      query: () => ({
        url: `api/TimeSheet/GetTimeSheets`,
      }),
    }),
    getProjects: build.query<any, void>({
      query: () => ({
        url: `api/TimeSheet/GetProjects`,
      }),
    }),
    getEmployees: build.query<any, void>({
      query: () => ({
        url: `api/User/GetEmployees`,
      }),
    }),
    addTimesheet: build.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `api/TimeSheet/AddTimeSheet`,
        method: "post",
        data: data,
      }),
    }),
  }),
});

export const {
  useGetTimeSheetsQuery,
  useGetEmployeesQuery,
  useGetProjectsQuery,
  useAddTimesheetMutation,
} = TimeSheetApi;
export const TimeSheetReducer = TimeSheetApi.reducer;
