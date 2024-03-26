import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

import {
  AXIOS_TIMEOUT_MSG,
  AXIOS_TIMEOUT_TIME,
  GLOBAL_API_REDUCER_PATH,
} from '@/constant/appConstants';

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

// initialize an empty api service that we'll inject endpoints into later as needed
axios.defaults.timeout = AXIOS_TIMEOUT_TIME;
axios.defaults.timeoutErrorMessage = AXIOS_TIMEOUT_MSG;
axios.defaults.maxContentLength = Infinity;
axios.defaults.maxBodyLength = Infinity;

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async (args, _api, _extraOptions) => {
    let session: Session | null = null;
    const { url, method, data, params } = args;

    try {
      session = await getSession();
      const token = session && session.token;

      const result = await axios({
        url: url,
        method,
        data,
        params,
        baseURL: baseUrl,
        headers: {
          token,
        },
        timeout: AXIOS_TIMEOUT_TIME,
        timeoutErrorMessage: AXIOS_TIMEOUT_MSG,
      });

      return { data: result?.data ? result.data : null };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err?.response?.status === 401) {
        toast.error('Session expired. Please login again');
        signOut();
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const globalApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL as string,
  }),
  reducerPath: GLOBAL_API_REDUCER_PATH,
  endpoints: () => ({}),
  tagTypes: ['Questions'],
});
