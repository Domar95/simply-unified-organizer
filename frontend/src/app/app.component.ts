import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserInterface } from '@feature/auth/models/user.interface';
import { AuthService } from '@feature/auth/services/auth.service';
import { UsersService } from '@feature/auth/services/users.service';

@Component({
  selector: 'suo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
})
export class AppComponent {
  title = 'Organizer WebApp';

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe({
      next: (user) => {
        const currentUser: UserInterface = {
          email: user.email,
          token: localStorage.getItem('token') ?? '', // TODO: a bit hacky; correct it
          username: user.username,
        };

        this.authService.currentUserSignal.set(currentUser);
      },
      error: () => {
        this.authService.currentUserSignal.set(null);
      },
    });
  }
}
