import { Component } from '@angular/core';

import { UsersService } from '../services/users.service';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserPostRequest } from '../services/users-api.model';

@Component({
  selector: 'suo-register',
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private usersService: UsersService) {}

  async onFormSubmitted(data: UserPostRequest) {
    const resp = await this.usersService.registerUser(data);
    console.log(resp);
  }
}
