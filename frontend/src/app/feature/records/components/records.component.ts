import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ProgrammingProjectComponent } from './records/programming-project/programming-project.component';

@Component({
  selector: 'suo-records',
  standalone: true,
  imports: [MatTabsModule, ProgrammingProjectComponent],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent {}
