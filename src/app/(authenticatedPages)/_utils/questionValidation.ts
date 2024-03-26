import { array, object, string } from 'yup';

import { QuestionIds } from '@/app/(authenticatedPages)/_utils/questionConstants';

export const questionValidationSchema = object({
  [QuestionIds.Question]: string().required('Please provide a question'),
  [QuestionIds.Options]: array()
    .of(string().required('Please provide an answer'))
    .min(3, 'Please provide at least three options')
    .max(5, 'Please provide at most 5 questions'),
});
