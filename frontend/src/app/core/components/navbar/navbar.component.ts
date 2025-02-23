import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
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
export class NavbarComponent {}
