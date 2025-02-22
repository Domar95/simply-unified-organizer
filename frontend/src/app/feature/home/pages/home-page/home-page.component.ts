import { Component } from '@angular/core';

import { HeroComponent } from '@feature/home/components/hero/hero.component';

@Component({
  selector: 'suo-home-page',
  imports: [HeroComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
