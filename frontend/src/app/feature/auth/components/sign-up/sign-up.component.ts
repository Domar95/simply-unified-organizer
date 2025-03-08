import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { NotificationService } from '@shared/services/notification.service';
import { UserPostRequest } from '@feature/auth/models/users-api.model';
import { UsersService } from '@feature/auth/services/users.service';

@Component({
  selector: 'suo-sign-up',
  imports: [SignUpFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  async onFormSubmitted(data: UserPostRequest) {
    try {
      await this.usersService.signUpUser(data);
      this.notificationService.openSnackBar(
        'You have been signed up. You can now log in.'
      );
      this.router.navigate(['auth', 'login']);
    } catch (error) {
      this.notificationService.openSnackBar('Failed to sign up.');
      throw error;
    }
  }
}
