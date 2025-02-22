import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { IconRegistryService } from '@core/services/icon-registry.service';

@Component({
  selector: 'suo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class NavbarComponent {
  constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons([
      { name: 'notebook_icon', url: './assets/icons/notebook_icon.svg' },
    ]);
  }
}
