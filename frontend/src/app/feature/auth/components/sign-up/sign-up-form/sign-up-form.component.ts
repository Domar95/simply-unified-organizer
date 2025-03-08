import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { HomeButtonComponent } from '@shared/components/ui-elements/buttons/home-button/home-button.component';
import { UserPostRequest } from '@feature/auth/models/users-api.model';

@Component({
  selector: 'suo-sign-up-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    HomeButtonComponent,
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  @Output() formSubmitted: EventEmitter<UserPostRequest> =
    new EventEmitter<UserPostRequest>();

  signUpForm = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  hide = signal(true);

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      console.warn('Form is invalid, cannot submit.');
      return;
    }

    this.formSubmitted.emit(this.signUpForm.getRawValue());
  }

  get requiredErrorMessage(): string {
    return 'This field is required';
  }
}
