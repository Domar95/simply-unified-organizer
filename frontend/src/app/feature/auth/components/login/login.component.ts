import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { UserLoginRequest } from '../models/users-api.model';
import { UsersService } from '../services/users.service';
import { NotificationService } from '@shared/services/notification.service';
import { AuthService } from '../services/auth.service';
import { UserInterface } from '../models/user.interface';

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
    private router: Router,
    private authService: AuthService
  ) {}

  async onFormSubmitted(data: UserLoginRequest) {
    try {
      const resp = await this.usersService.loginUser(data);

      const user: UserInterface = {
        email: resp.user.email,
        token: resp.user.id,
        username: resp.user.username,
      };

      localStorage.setItem('token', resp.access_token);
      this.authService.currentUserSignal.set(user);

      this.notificationService.openSnackBar('You have been logged in.');
      this.router.navigate(['/']);
    } catch (error) {
      this.notificationService.openSnackBar('Failed to log in.');
      throw error;
    }
  }
}
