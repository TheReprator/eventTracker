import axios, { Method } from 'axios';
import { API_BASE_URL, API_TIMEOUT, API_KEY } from '@env';
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { SerializedError } from '@reduxjs/toolkit';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: Number(API_TIMEOUT),
  params: { apikey: API_KEY }
});

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }): BaseQueryFn<
  { url: string; method: string; data?: any; params?: any; headers?: any; body?: any },
  unknown, unknown > =>
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

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        error: axiosError?.response?.data ?? axiosError,
      };
    }
  };

export default axiosBaseQuery;


export function getServerErrorMessage(err: any): string | null {
  if (!err) return null;

  if (err.error) {
    if (typeof err.error === "string") return err.error;
    if (typeof err.error.message === "string") return err.error.message;
    return JSON.stringify(err.error);
  }

  const serial = err as SerializedError;
  if (serial.message) return serial.message;

  return "Something went wrong";
}
