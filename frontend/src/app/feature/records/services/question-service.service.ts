import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { QuestionBase } from '@feature/records/models/question-base.model';
import {
  NumberQuestion,
  TextareaQuestion,
  TextQuestion,
} from '../models/question-types.model';

@Injectable()
export class QuestionService {
  constructor() {}

  getKnowledgeRecordQuestions() {
    const questions: QuestionBase<string | number>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 2,
      }),

      new TextareaQuestion({
        key: 'domain',
        label: 'Domain',
        required: false,
        order: 3,
      }),

      new TextQuestion({
        key: 'link',
        label: 'Link',
        required: false,
        order: 4,
      }),

      new TextQuestion({
        key: 'image',
        label: 'Image',
        required: false,
        order: 5,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
