import { Component } from '@angular/core';

import { LoginFormComponent } from '../../login/login-form/login-form.component';

@Component({
  selector: 'suo-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
