import { Edit } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import Button from '@/components/buttons/Button';

import { useDeleteQuestionMutation } from '@/api/questions';
import { QuestionResponse } from '@/api/questions/questionApiTypes';
import { handleErrors } from '@/utils/error';

type QuestionItemProps = {
  setCurrentQuestion: Dispatch<
    SetStateAction<
      | {
          questionId: string;
          question: QuestionResponse;
        }
      | undefined
    >
  >;
  question: QuestionResponse;
  openEditQuestion: () => void;
  questionId: string;
};

export default function QuestionItem({
  setCurrentQuestion,
  question,
  openEditQuestion,
  questionId,
}: QuestionItemProps) {
  const [deleteQuestion, result] = useDeleteQuestionMutation();

  async function deleteQuestionFn() {
    try {
      await deleteQuestion(questionId);
    } catch (e) {
      handleErrors(e);
    }
  }

  function triggerEditQuestion() {
    setCurrentQuestion({ questionId, question });
    openEditQuestion();
  }

  return (
    <div className='flex items-start justify-between'>
      <div className='flex flex-col gap-3'>
        <p className='font-semibold text-lg'>{question.question}</p>

        <ol className='flex flex-col gap-1 list-decimal ml-4'>
          {question.options.map((option) => (
            <li key={option} className='capitalize text-sm'>
              {option}
            </li>
          ))}
        </ol>
      </div>

      <div className='flex items-center gap-2'>
        <Button variant='outline' onClick={triggerEditQuestion}>
          <Edit />
        </Button>
        <Button
          variant='danger'
          className='w-fit'
          onClick={deleteQuestionFn}
          isLoading={result.isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
