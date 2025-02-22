import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent, NavbarComponent } from '@core/components';

@Component({
  selector: 'suo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class AppComponent {
  title = 'Organizer WebApp';
}
