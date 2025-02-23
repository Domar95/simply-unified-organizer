import { Component } from '@angular/core';

import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'suo-login-page',
  imports: [LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
