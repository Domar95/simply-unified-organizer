import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IconRegistryService } from './services/icon-registry.service';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {
  constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons([
      { name: 'notebook_icon', url: './assets/icons/notebook_icon.svg' },
    ]);
  }
}
