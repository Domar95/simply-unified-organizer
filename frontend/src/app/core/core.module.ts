import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { IconRegistryService } from './services/icon-registry.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {
  constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons([
      { name: 'notebook_icon', url: './assets/icons/notebook_icon.svg' },
    ]);
  }
}
