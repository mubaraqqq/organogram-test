import { globalApi } from '@/api';
import { QuestionEndpoints } from '@/api/questions/questionApiConstants';
import { QuestionResponse } from '@/api/questions/questionApiTypes';
import {
  DELETE_METHOD,
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
} from '@/constant/appConstants';

const questionsApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getQuestions: build.query<Record<string, QuestionResponse>, void>({
      query: () => ({
        url: QuestionEndpoints.Get_Questions,
        method: GET_METHOD,
      }),
      providesTags: ['Questions'],
    }),

    createQuestion: build.mutation<void, QuestionResponse>({
      query: (payload) => ({
        url: QuestionEndpoints.Create_Question,
        method: POST_METHOD,
        data: payload,
      }),
      invalidatesTags: ['Questions'],
    }),

    updateQuestion: build.mutation<
      void,
      {
        questionId: string;
        data: QuestionResponse;
      }
    >({
      query: (payload) => ({
        url: QuestionEndpoints.Update_Question.replace(
          ':questionId',
          payload.questionId,
        ),
        method: PUT_METHOD,
        data: payload.data,
      }),
      invalidatesTags: ['Questions'],
    }),

    deleteQuestion: build.mutation<void, string>({
      query: (payload) => ({
        url: QuestionEndpoints.Delete_Question.replace(':questionId', payload),
        method: DELETE_METHOD,
      }),
      invalidatesTags: ['Questions'],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApi;
