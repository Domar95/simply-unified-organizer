import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'suo-records',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent {
  tabs = [
    {
      label: 'Programming Project',
      route: 'programming-project',
    },
    {
      label: 'Knowledge',
      route: 'knowledge',
    },
  ];
  activeLink = this.tabs[0];
}
