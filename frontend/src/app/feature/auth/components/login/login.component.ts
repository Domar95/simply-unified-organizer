import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { UserLoginRequest } from '../models/users-api.model';
import { UsersService } from '../services/users.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'suo-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  async onFormSubmitted(data: UserLoginRequest) {
    try {
      const resp = await this.usersService.loginUser(data);
      console.log(resp);
      this.notificationService.openSnackBar('You have been logged in.');
      this.router.navigate(['/']);
    } catch (error) {
      this.notificationService.openSnackBar('Failed to log in.');
      throw error;
    }
  }
}
