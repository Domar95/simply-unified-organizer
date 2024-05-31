import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  public registerIcons(icons: { name: string; url: string }[]): void {
    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }
}
