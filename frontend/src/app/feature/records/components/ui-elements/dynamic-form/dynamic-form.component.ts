import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { QuestionBase } from '@feature/records/models';
import { QuestionControlService } from '@feature/records/services/question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'suo-dynamic-form',
  providers: [QuestionControlService],
  imports: [ReactiveFormsModule, DynamicFormQuestionComponent, MatButtonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) questions: QuestionBase<string | number | Date>[] =
    [];
  @Input() readonly: boolean = false;

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;
  payLoad = '';

  constructor(
    private questionControlService: QuestionControlService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.questionControlService.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.formSubmitted.emit(this.form.getRawValue());
    this.form.reset();
  }

  onCancel() {
    this.form.reset();
    // TODO: extract logic to parent component
    this.router.navigate(['/records']);
  }
}
