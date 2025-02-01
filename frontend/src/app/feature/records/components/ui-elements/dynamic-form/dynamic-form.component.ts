import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { QuestionBase } from '@feature/records/models';
import { QuestionControlService } from '@feature/records/services/question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'suo-dynamic-form',
  standalone: true,
  providers: [QuestionControlService],
  imports: [ReactiveFormsModule, DynamicFormQuestionComponent, MatButtonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

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
    this.formSubmitted.emit(this.form.getRawValue());
  }

  onCancel() {
    console.log('cancelled');
  }
}
