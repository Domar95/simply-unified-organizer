import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { RecordsComponent } from '@feature/records/components';

@Component({
  selector: 'suo-records-page',
  imports: [MatTabsModule, RouterModule, RecordsComponent],
  templateUrl: './records-page.component.html',
  styleUrl: './records-page.component.scss',
})
export class RecordsPageComponent {
  tabs = [
    {
      label: 'Programming Project',
      route: 'programming-project',
    },
    {
      label: 'Knowledge',
      route: 'knowledge',
    },
    {
      label: 'Note',
      route: 'note',
    },
  ];
  activeLink!: { label: string; route: string };
  category!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((params) => params.get('category')))
      .subscribe((category) => {
        this.category = category || this.tabs[0].route;
        this.activeLink =
          this.tabs.find((tab) => tab.route === category) || this.tabs[0];
      });
  }
}
