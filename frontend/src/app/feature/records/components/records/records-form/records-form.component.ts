import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ProgrammingProjectPostRequest } from '@feature/records/models';
import { RecordsApiService } from '@feature/records/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'suo-records-form',
  standalone: true,
  providers: [provideNativeDateAdapter(), RecordsApiService],

  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDatepickerModule,
    MatCardModule,
  ],
  templateUrl: './records-form.component.html',
  styleUrl: './records-form.component.scss',
})
export class RecordsFormComponent {
  recordsForm = new FormGroup({
    category_id: new FormControl<number | null>(8, Validators.required),
    deadline: new FormControl<Date | null>(null),
    description: new FormControl<string | null>(null),
    extra: new FormControl<string | null>(null),
    importance: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, Validators.required),
    used_technologies: new FormControl<string | null>(null),
  });

  constructor(
    private recordsApiService: RecordsApiService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async onSubmit() {
    if (this.recordsForm.valid) {
      // TODO: convert deadline Date
      const programmingProject: ProgrammingProjectPostRequest = this.recordsForm
        .value as ProgrammingProjectPostRequest;

      console.log(programmingProject);
      await this.recordsApiService.addProgrammingProject(programmingProject);
      this.openSnackBar('Record added successfully!', 'Close');
      this.recordsForm.reset();
    }
  }

  onCancel() {
    this.recordsForm.reset();
    this.router.navigate(['/records']);
  }
}
