import { Injectable } from '@angular/core';

import { QuestionBase } from '@feature/records/models/question-base.model';
import {
  DateQuestion,
  NumberQuestion,
  TextareaQuestion,
  TextQuestion,
} from '../models/question-types.model';

@Injectable()
export class QuestionService {
  constructor() { }

  getKnowledgeRecordQuestions(): QuestionBase<string | number>[] {
    const questions: QuestionBase<string | number>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),

      new TextQuestion({
        key: 'text',
        label: 'Text',
        required: false,
        order: 2,
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 3,
      }),

      new TextareaQuestion({
        key: 'domain',
        label: 'Domain',
        required: false,
        order: 4,
      }),

      new TextQuestion({
        key: 'link',
        label: 'Link',
        required: false,
        order: 5,
      }),

      new TextQuestion({
        key: 'image',
        label: 'Image',
        required: false,
        order: 6,
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  getProgrammingProjectQuestions(): QuestionBase<unknown>[] {
    const questions: QuestionBase<string | number | Date>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),

      new TextQuestion({
        key: 'text',
        label: 'Text',
        required: false,
        order: 2,
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 3,
      }),

      new DateQuestion({
        key: 'deadline',
        label: 'Deadline',
        required: false,
        order: 4,
      }),

      new TextQuestion({
        key: 'used_technologies',
        label: 'Used Technologies',
        required: false,
        order: 5,
      }),

      new TextareaQuestion({
        key: 'description',
        label: 'Description',
        required: false,
        order: 6,
      }),

      new TextareaQuestion({
        key: 'extra',
        label: 'Extra',
        required: false,
        order: 7,
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  getNoteQuestions(): QuestionBase<unknown>[] {
    const questions: QuestionBase<string | number>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),

      new TextQuestion({
        key: 'text',
        label: 'Text',
        required: false,
        order: 2,
      }),

      new TextareaQuestion({
        key: 'description',
        label: 'Description',
        required: false,
        order: 3,
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 4,
      }),

      new TextQuestion({
        key: 'type',
        label: 'Type',
        required: false,
        order: 5,
      }),

      new TextQuestion({
        key: 'link',
        label: 'Link',
        required: false,
        order: 6,
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}

