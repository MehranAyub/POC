import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../Api/agent.ts";

export const TimeSheetApi = createApi({
  reducerPath: "TimeSheetApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getTimeSheets: build.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `api/TimeSheet/GetTimeSheets`,
        method: "post",
        data: data,
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
    deleteTimesheet: build.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `api/TimeSheet/` + id,
        method: "delete",
        data: null,
      }),
    }),
    approveTimesheet: build.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `api/TimeSheet/` + id,
        method: "put",
        data: null,
      }),
    }),
  }),
});

export const {
  useGetTimeSheetsMutation,
  useGetEmployeesQuery,
  useGetProjectsQuery,
  useAddTimesheetMutation,
  useDeleteTimesheetMutation,
  useApproveTimesheetMutation,
} = TimeSheetApi;
export const TimeSheetReducer = TimeSheetApi.reducer;
