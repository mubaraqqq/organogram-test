import { useFormik } from 'formik';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { ModalProps } from '@/components/modal/modal.d';

import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/api/questions';
import { QuestionResponse } from '@/api/questions/questionApiTypes';
import {
  QuestionIds,
  questionInitialValues,
} from '@/app/(authenticatedPages)/_utils/questionConstants';
import { questionValidationSchema } from '@/app/(authenticatedPages)/_utils/questionValidation';
import { handleErrors } from '@/utils/error';

type Props = ModalProps & {
  isEdit?: boolean;
  questionToEdit?: {
    questionId: string;
    question: QuestionResponse;
  };
};

export default function CreateEditQuestionModal({
  isEdit,
  questionToEdit,
  ...rest
}: Props) {
  const [createQuestion, createResult] = useCreateQuestionMutation();
  const [updateQuestion, updateResult] = useUpdateQuestionMutation();
  const result = isEdit ? updateResult : createResult;

  const [options, setOptions] = useState(() => {
    if (isEdit && questionToEdit) return questionToEdit.question.options;
    else return ['', '', ''];
  });

  const {
    handleSubmit,
    values,
    getFieldMeta,
    getFieldProps,
    setFieldValue,
    setFieldTouched,
    isValid,
    resetForm,
  } = useFormik({
    initialValues:
      isEdit && questionToEdit
        ? questionToEdit.question
        : questionInitialValues,
    onSubmit: async (values) => {
      try {
        if (isEdit && questionToEdit) {
          await updateQuestion({
            questionId: questionToEdit.questionId,
            data: {
              question: values[QuestionIds.Question],
              options: values[QuestionIds.Options],
            },
          });
        } else {
          await createQuestion({
            question: values[QuestionIds.Question],
            options: values[QuestionIds.Options],
          });
        }

        rest.close();
        clearForm();
      } catch (e) {
        handleErrors(e);
      }
    },
    validationSchema: questionValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const getFormikInputProps = (id: keyof typeof values) => {
    return {
      ...getFieldProps(id),
      ...getFieldMeta(id),
    };
  };

  function clearForm() {
    resetForm();
    setOptions(['', '', '']);
  }

  async function onOptionChange(value: string, index: number) {
    const newOptions = options.slice();
    newOptions.splice(index, 1, value);
    setOptions(newOptions);

    await setFieldValue(QuestionIds.Options, newOptions);
    await setFieldTouched(QuestionIds.Options, true, true);
  }

  function addOption() {
    if (options.length < 5) setOptions([...options, '']);
    else setOptions(options);
  }

  function deleteOption() {
    const newOptions = options.slice();
    newOptions.pop();
    if (options.length > 3) setOptions(newOptions);
    else setOptions(options);
  }

  return (
    <Modal
      {...rest}
      onAfterClose={clearForm}
      className='flex h-auto w-5/6 lg:w-2/5'
    >
      <section className='h-full w-full overflow-y-auto bg-white p-10'>
        <p className='text-primary-black text-xl font-medium'>
          {!isEdit && 'Create Question'}
          {isEdit && 'Edit Question'}
        </p>

        <form onSubmit={handleSubmit} className='mt-12'>
          <Input
            id={QuestionIds.Question}
            type='text'
            placeholder='what is your name?'
            label='Question'
            {...getFormikInputProps(QuestionIds.Question)}
          />

          <div className='my-6 flex flex-col gap-4'>
            <p className='text-xs font-medium md:text-sm lg:text-base'>
              Options
            </p>
            {options.map((_, index) => (
              <Input
                id=''
                key={index}
                type='text'
                placeholder='answer'
                value={options[index]}
                onChange={(e) => onOptionChange(e.target.value, index)}
              />
            ))}

            <div className='flex items-center gap-10'>
              <Button
                variant='outline'
                onClick={addOption}
                disabled={options.length >= 5}
                className='w-fit'
              >
                Add Option
              </Button>
              <Button
                variant='danger'
                onClick={deleteOption}
                disabled={options.length <= 3}
                className='w-fit'
              >
                Delete Option
              </Button>
            </div>
          </div>

          <Button
            className='mt-10'
            type='submit'
            disabled={!isValid}
            isLoading={result.isLoading}
          >
            {isEdit ? 'Update' : 'Create'} Question
          </Button>
        </form>
      </section>
    </Modal>
  );
}
