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
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { NotificationService } from '@shared/services/notification.service';
import { ProgrammingProjectPostRequest } from '@feature/records/models';
import { RecordsApiService } from '@feature/records/services';

@Component({
  selector: 'suo-records-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    RecordsApiService,
    NotificationService,
  ],

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
    private router: Router,
    private notificationService: NotificationService
  ) {}

  async onSubmit() {
    if (this.recordsForm.valid) {
      // TODO: convert deadline Date
      const programmingProject: ProgrammingProjectPostRequest = this.recordsForm
        .value as ProgrammingProjectPostRequest;

      console.log(programmingProject);
      await this.recordsApiService.addProgrammingProject(programmingProject);
      this.notificationService.openSnackBar('Record added successfully!');
      this.recordsForm.reset();
    }
  }

  onCancel() {
    this.recordsForm.reset();
    this.router.navigate(['/records']);
  }
}
