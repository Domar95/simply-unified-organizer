import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent, NavbarComponent } from '@core/components';

@Component({
  selector: 'suo-feature-layout',
  imports: [FooterComponent, NavbarComponent, RouterModule],
  templateUrl: './feature-layout.component.html',
  styleUrl: './feature-layout.component.scss',
})
export class FeatureLayoutComponent {}
