import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent, NavbarComponent } from '@core/components';

@Component({
  selector: 'suo-home-layout',
  imports: [FooterComponent, NavbarComponent, RouterModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {}
