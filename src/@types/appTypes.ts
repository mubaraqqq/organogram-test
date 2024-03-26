export type INetworkSuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type IQueryDataResponse<T> = {
  data: T;
  status: string;
  page: number;
  totalCount: number;
  totalPages: number;
  count: number;
  limit: number;
};
