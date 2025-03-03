import { QuestionBase } from './question-base.model';

export class TextQuestion extends QuestionBase<string> {
  override controlType = 'text';
}

export class TextareaQuestion extends QuestionBase<string> {
  override controlType = 'textarea';
}

export class NumberQuestion extends QuestionBase<number> {
  override controlType = 'number';
}

export class DateQuestion extends QuestionBase<Date> {
  override controlType = 'date';
}