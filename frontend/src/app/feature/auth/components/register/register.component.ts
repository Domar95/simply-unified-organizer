import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NotificationService } from '@shared/services/notification.service';
import { UserPostRequest } from '../models/users-api.model';

@Component({
  selector: 'suo-register',
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  async onFormSubmitted(data: UserPostRequest) {
    try {
      await this.usersService.registerUser(data);
      this.notificationService.openSnackBar(
        'You have been registered. You can now log in.'
      );
      this.router.navigate(['auth', 'login']);
    } catch (error) {
      this.notificationService.openSnackBar('Failed to register');
      throw error;
    }
  }
}
