import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../register/register-form/register-form.component';

@Component({
  selector: 'suo-register-page',
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {}
