export enum QuestionIds {
  Question = 'question',
  Options = 'options',
}

export const questionInitialValues = {
  [QuestionIds.Question]: '',
  [QuestionIds.Options]: [''],
};
