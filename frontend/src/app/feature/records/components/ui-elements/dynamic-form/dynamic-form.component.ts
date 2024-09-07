import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuestionBase } from '@feature/records/models';
import { QuestionControlService } from '@feature/records/services/question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'suo-dynamic-form',
  standalone: true,
  providers: [QuestionControlService],
  imports: [ReactiveFormsModule, DynamicFormQuestionComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];

  form!: FormGroup;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService) {}

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(
      this.questions as QuestionBase<string>[]
    );
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
