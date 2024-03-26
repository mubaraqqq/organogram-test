'use client';

import { useState } from 'react';

import { useDisclosure } from '@/hooks';

import Button from '@/components/buttons/Button';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import PaddedContainer from '@/components/padded-container';

import { useGetQuestionsQuery } from '@/api/questions';
import { QuestionResponse } from '@/api/questions/questionApiTypes';
import CreateEditQuestionModal from '@/app/(authenticatedPages)/_components/CreateEditQuestionModal';
import QuestionItem from '@/app/(authenticatedPages)/_components/QuestionItem';

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState<
    | {
        questionId: string;
        question: QuestionResponse;
      }
    | undefined
  >(undefined);

  const {
    isOpen: isCreateQuestionOpen,
    close: closeCreateQuestion,
    open: openCreateQuestion,
  } = useDisclosure();

  const {
    isOpen: isEditQuestionOpen,
    close: closeEditQuestion,
    open: openEditQuestion,
  } = useDisclosure();

  const { data: questionResponse, isLoading } = useGetQuestionsQuery();

  const isQuestionListEmpty = Object.keys(questionResponse ?? {}).length === 0;

  return (
    <>
      <PaddedContainer isScrollable>
        <h1 className='font-plus-jakarta-sans'>Welcome back</h1>

        <div className='flex items-center justify-between mt-20'>
          <h2>Questions</h2>
          <Button onClick={openCreateQuestion}>Create Question</Button>
        </div>

        <div className='mt-20 flex flex-col gap-8'>
          {isLoading &&
            Array(5)
              .fill('')
              .map((_, id) => (
                <LoadingSkeleton key={id} className='w-fit h-20' />
              ))}

          {!isLoading && isQuestionListEmpty && <p>No questions created</p>}

          {questionResponse &&
            Object.entries(questionResponse).map(([id, questionObject]) => (
              <QuestionItem
                key={id}
                question={questionObject}
                setCurrentQuestion={setCurrentQuestion}
                openEditQuestion={openEditQuestion}
                questionId={id}
              />
            ))}
        </div>
      </PaddedContainer>

      <CreateEditQuestionModal
        isOpen={isCreateQuestionOpen}
        close={closeCreateQuestion}
      />

      <CreateEditQuestionModal
        isEdit
        key='Edit'
        questionToEdit={currentQuestion}
        isOpen={isEditQuestionOpen}
        close={closeEditQuestion}
      />
    </>
  );
}
