import { Injectable } from '@angular/core';

import { QuestionBase } from '@feature/records/models/question-base.model';
import {
  DateQuestion,
  NumberQuestion,
  TextareaQuestion,
  TextQuestion,
} from '../models/question-types.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() { }

  getKnowledgeRecordQuestions(initialValues: Record<string, string | number> = {}): QuestionBase<string | number>[] {
    const questions: QuestionBase<string | number>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
        value: initialValues['name'] as string
      }),

      new TextQuestion({
        key: 'text',
        label: 'Text',
        required: false,
        order: 2,
        value: initialValues['text'] as string
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 3,
        value: initialValues['importance'] as number
      }),

      new TextareaQuestion({
        key: 'domain',
        label: 'Domain',
        required: false,
        order: 4,
        value: initialValues['domain'] as string
      }),

      new TextQuestion({
        key: 'link',
        label: 'Link',
        required: false,
        order: 5,
        value: initialValues['link'] as string
      }),

      new TextQuestion({
        key: 'image',
        label: 'Image',
        required: false,
        order: 6,
        value: initialValues['image'] as string
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  getProgrammingProjectQuestions(initialValues: Record<string, string | number> = {}): QuestionBase<string | number | Date>[] {
    const questions: QuestionBase<string | number | Date>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
        value: initialValues['name'] as string
      }),

      new TextQuestion({
        key: 'text',
        label: 'Text',
        required: false,
        order: 2,
        value: initialValues['text'] as string
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 3,
        value: initialValues['importance'] as number
      }),

      new DateQuestion({
        key: 'deadline',
        label: 'Deadline',
        required: false,
        order: 4,
        value: initialValues['deadline'] ? new Date(initialValues['deadline']) : undefined
      }),

      new TextQuestion({
        key: 'used_technologies',
        label: 'Used Technologies',
        required: false,
        order: 5,
        value: initialValues['used_technologies'] as string
      }),

      new TextareaQuestion({
        key: 'description',
        label: 'Description',
        required: false,
        order: 6,
        value: initialValues['description'] as string
      }),

      new TextareaQuestion({
        key: 'extra',
        label: 'Extra',
        required: false,
        order: 7,
        value: initialValues['extra'] as string
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  getNoteQuestions(initialValues: Record<string, string | number> = {}): QuestionBase<string | number>[] {
    const questions: QuestionBase<string | number>[] = [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
        value: initialValues['name'] as string
      }),

      new TextQuestion({
        key: 'text',
        label: 'Text',
        required: false,
        order: 2,
        value: initialValues['text'] as string
      }),

      new TextareaQuestion({
        key: 'description',
        label: 'Description',
        required: false,
        order: 3,
        value: initialValues['description'] as string
      }),

      new NumberQuestion({
        key: 'importance',
        label: 'Importance',
        required: false,
        order: 4,
        value: initialValues['importance'] as number
      }),

      new TextQuestion({
        key: 'type',
        label: 'Type',
        required: false,
        order: 5,
        value: initialValues['type'] as string
      }),

      new TextQuestion({
        key: 'link',
        label: 'Link',
        required: false,
        order: 6,
        value: initialValues['link'] as string
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}

