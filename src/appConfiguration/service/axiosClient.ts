import axios, { Method } from 'axios';
import { API_BASE_URL, API_TIMEOUT, API_KEY } from '@env';
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: Number(API_TIMEOUT),
  params: { apikey: API_KEY }
});

axiosInstance.interceptors.response.use(res => res, err => {
  const msg = err?.response?.data?.errors?.[0]?.detail || err.message || 'API Error';
  console.log("axios interceptor API Error:", msg);
  return Promise.reject({ message: msg });
});


const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }): BaseQueryFn<
  { url: string; method: string; data?: any; params?: any; headers?: any; body?: any },
  unknown, unknown> =>
  async ({ url, method, data, params, headers, body }) => {
    try {
      const config: AxiosRequestConfig = {
        url: baseUrl + url,
        method: method as Method,
        data,
        params,
        headers,
        ...(body ? { body } : {}),
      };

      const result = await axiosInstance(config);

      const resultFinal =  { data: result };
      console.log("axiosBaseQuery API success:", resultFinal);
      
      return resultFinal;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = {
        error: axiosError?.response?.data ?? axiosError,
      };

      console.log("axiosBaseQuery API Error:", errorMessage);
      return errorMessage
    }
  };

export default axiosBaseQuery;
