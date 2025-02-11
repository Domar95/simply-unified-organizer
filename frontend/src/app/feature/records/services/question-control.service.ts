import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '@feature/records/models/question-base.model';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<string | number | Date>[]) {
    const group: any = {};
    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || null, Validators.required)
        : new FormControl(question.value || null);
    });
    return new FormGroup(group);
  }
}
