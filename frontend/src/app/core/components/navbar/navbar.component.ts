import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@feature/auth/components/services/auth.service';
import { HomeButtonComponent } from '@shared/components/ui-elements/buttons/home-button/home-button.component';

@Component({
  selector: 'suo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    HomeButtonComponent,
  ],
})
export class NavbarComponent {
  constructor(readonly authService: AuthService, private router: Router) {}

  logout(): void {
    localStorage.setItem('token', '');
    this.authService.currentUserSignal.set(null);
    this.router.navigate(['/']);
  }
}
