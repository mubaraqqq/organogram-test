export const AXIOS_TIMEOUT_TIME = 30000;
export const AXIOS_TIMEOUT_MSG = 'Request Timeout';
export const TOKEN_EXPIRED_MSG = 'session expired. please login again';
export const REFETCH_TIME = 43200000;

// IMAGE URL
export const IMAGE_PUBLIC_URL =
  `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}` as const;

// Redux Reducers Key
export const GLOBAL_API_REDUCER_PATH = 'globalApi' as const;
export const JOIN_POT_REDUCER_PATH = 'join_pot' as const;

export const POST_METHOD = 'POST';
export const GET_METHOD = 'GET';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';
export const PATCH_METHOD = 'PATCH';

// FORGOT PASSWORD REDUCER PATH START
export const FORGOT_PASSWORD_REDUCER_PATH = 'forgot_password' as const;
// FORGOT PASSWORD REDUCER PATH END

// API Paths
export const REGISTER_USER_PATH = '/user/signup';
export const VERIFY_OTP_PATH = '/user/otp/verify';
export const REQUEST_OTP_PATH = '/user/otp/request';
export const POT_PATH = '/pot';

export const PHONE_NUMBER_REGEX = new RegExp(
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);

// Password Rules Regex
export const UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
export const NUMBER_REGEX = new RegExp(/.*\d/);
export const LENGTH_REGEX = new RegExp(/.{8,20}$/);
export const SPECIAL_CHARS_REGEX = new RegExp(
  /.*[-'/`~!*$@#_%+=.,^&()[\];:"<>?\\]/
);
// [!@#%^&*()_+-=[]{}|;':",./<>?~`]

export const PASSWORD_VALID_REGEX = new RegExp(
  `^(?=${[
    UPPERCASE_REGEX.source,
    NUMBER_REGEX.source,
    LENGTH_REGEX.source,
    SPECIAL_CHARS_REGEX.source,
  ].join(')(?=')}).*$`
);

export const PASSWORD_RULES = [
  { label: '8 - 20 Characters', pattern: LENGTH_REGEX },
  { label: 'At least one uppercase character', pattern: UPPERCASE_REGEX },
  { label: 'At Least one number', pattern: NUMBER_REGEX },
  { label: 'At least one special character', pattern: SPECIAL_CHARS_REGEX },
];
