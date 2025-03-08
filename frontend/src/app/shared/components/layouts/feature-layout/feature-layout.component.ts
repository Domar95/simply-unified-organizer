import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '@core/components';

@Component({
  selector: 'suo-feature-layout',
  imports: [NavbarComponent, RouterModule],
  templateUrl: './feature-layout.component.html',
  styleUrl: './feature-layout.component.scss',
})
export class FeatureLayoutComponent {}
