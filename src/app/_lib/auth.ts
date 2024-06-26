import axios, { AxiosError } from 'axios';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import logger from '@/lib/logger';

import { BASE_URL } from '@/api';
import { AuthEndpoints } from '@/api/auth/authApiConstants';
import { LOGIN_PAGE_IDs } from '@/app/(authenticationPages)/login/_utils/loginPageConstants';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login Form',
      id: 'login',
      credentials: {
        [LOGIN_PAGE_IDs.Email]: {
          label: 'email',
          type: 'email',
          placeholder: 'example@example.com',
        },
      },
      async authorize(credentials) {
        try {
          const data: {
            email: string;
          } = {
            email: credentials?.email as string,
          };

          const user = await axios.post<User>(
            `${BASE_URL}${AuthEndpoints.Login}`,
            data,
          );

          return user.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            if (
              error.response?.data &&
              typeof error.response.data === 'object'
            ) {
              if (
                error.response.data.message &&
                typeof error.response.data.message === 'string'
              ) {
                if (
                  error.response.data &&
                  typeof error.response.data.data === 'object' &&
                  'error' in error.response.data.data &&
                  typeof error.response.data.data.error === 'string'
                ) {
                  if (
                    error.response.data.data.error.toLowerCase() ===
                    'Email or Password Incorrect'.toLowerCase()
                  ) {
                    logger(error.response.data.data.error);

                    throw new Error('Invalid credentials. Please try again');
                  }

                  logger(error.response.data.data.error);
                  throw new Error(error.response.data.data.error);
                }

                if (
                  error.response.data.message.toLowerCase() ===
                  'Email or Password Incorrect'.toLowerCase()
                ) {
                  throw new Error('Invalid credentials. Please try again');
                }

                if (
                  error.response.data.error.toLowerCase() ===
                  'Email or Password Incorrect'.toLowerCase()
                ) {
                  throw new Error('Invalid credentials. Please try again');
                }
              }
              logger(error.response.data.message);
              throw new Error(error.response.data.message);
            }
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 330 days
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        const updatedToken = token;

        updatedToken.data = session;

        return updatedToken;
      }

      user && (token.data = user);

      return token;
    },
    session: ({ session, token }) => {
      session.token = token.data.token;

      return session;
    },
  },
};
