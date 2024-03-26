export const AXIOS_TIMEOUT_TIME = 30000;
export const AXIOS_TIMEOUT_MSG = 'Request Timeout';
export const TOKEN_EXPIRED_MSG = 'session expired. please login again';
export const REFETCH_TIME = 43200000;

// IMAGE URL
export const IMAGE_PUBLIC_URL =
  `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}` as const;

// Redux Reducers Key
export const GLOBAL_API_REDUCER_PATH = 'globalApi' as const;

export const POST_METHOD = 'POST';
export const GET_METHOD = 'GET';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';
export const PATCH_METHOD = 'PATCH';
