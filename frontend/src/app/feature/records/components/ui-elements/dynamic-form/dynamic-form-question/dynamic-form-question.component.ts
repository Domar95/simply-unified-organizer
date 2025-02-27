import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QuestionBase } from '@feature/records/models';

@Component({
  selector: 'suo-dynamic-form-question',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.scss',
})
export class DynamicFormQuestionComponent {
  @Input({ required: true }) question!: QuestionBase<string | number | Date>;
  @Input({ required: true }) form!: FormGroup;
  @Input() readonly: boolean = false;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
