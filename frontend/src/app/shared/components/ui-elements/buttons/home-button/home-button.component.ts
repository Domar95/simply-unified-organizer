import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IconRegistryService } from '@core/services/icon-registry.service';

@Component({
  selector: 'suo-home-button',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
})
export class HomeButtonComponent {
  constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons([
      { name: 'notebook_icon', url: './assets/icons/notebook_icon.svg' },
    ]);
  }
}
