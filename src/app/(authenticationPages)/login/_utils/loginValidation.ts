import { object, string } from 'yup';

import { LOGIN_PAGE_IDs } from '@/app/(authenticationPages)/login/_utils/loginPageConstants';

export const loginValidationSchema = object({
  [LOGIN_PAGE_IDs.Email]: string()
    .email('Please enter a valid email')
    .required('Please provide your email'),
});
