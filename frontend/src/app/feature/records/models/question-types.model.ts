import { QuestionBase } from './question-base.model';

export class TextQuestion extends QuestionBase<string> {
  override controlType = 'text';
}

export class TextareaQuestion extends QuestionBase<string> {
  override controlType = 'textarea';
}

export class NumberQuestion extends QuestionBase<string> {
  override controlType = 'number';
}
