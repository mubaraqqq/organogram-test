'use client';

import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast'; 

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { handleErrors } from '@/utils/error';

import { LOGIN_PAGE_IDs } from './_utils/loginPageConstants';
import { loginValidationSchema } from './_utils/loginValidation';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter(); 

  const formik = useFormik({
    initialValues: {
      [LOGIN_PAGE_IDs.Email]: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const res = await signIn('login', { redirect: false, ...values });

        if ((!res || res.error) && res?.error !== 'undefined') {
          if (res?.error === 'CredentialsSignin') {
            // yes
            setIsLoading(false);

            toast.error('Something went wrong');
            return;
          }
          toast.error(res?.error || 'Something went wrong');
          setIsLoading(false);

          return;
        }
        // formik.resetForm();
        const callbackUrl = searchParams.get('callbackUrl');

        if (typeof callbackUrl === 'string') {
          return router.replace(new URL(callbackUrl).toString());
        }

        router.replace('/');
      } catch (error) {
        setIsLoading(false);
        handleErrors(error);
      }
    },
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const getFormikInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  return (
    <div className='w-auto'>
      <h3>Login</h3>
      <form
        className='mt-9 flex w-[400px] flex-col gap-6'
        onSubmit={formik.handleSubmit}
      > 
        <Input
          id={LOGIN_PAGE_IDs.Email}
          type='email'
          placeholder='bxnb@twix.co'
          label='Email address'
          {...getFormikInputProps(LOGIN_PAGE_IDs.Email)}
        />

        <div className='flex items-center justify-between'>
         
          <Button
            type='submit'
            className='w-full text-center justify-center p-4'
            isLoading={isLoading}
            disabled={!formik.dirty || !formik.isValid}
          >
            Sign In 
          </Button>
        </div>
      </form>
    </div>
  );
}
