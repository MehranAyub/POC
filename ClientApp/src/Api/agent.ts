import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const baseURL = "https://localhost:7148/";
axios.defaults.baseURL = baseURL;

let token: string | undefined = undefined;

export const agentListener = () => {};

axios.interceptors.request.use((config) => {
  //   if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status, config } = error.response!;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: baseURL! }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
