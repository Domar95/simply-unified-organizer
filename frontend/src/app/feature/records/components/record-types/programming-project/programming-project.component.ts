import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { ProgrammingProjectGetResponse } from '@feature/records/models';
import { RecordsApiService } from '@feature/records/services';
import { RecordsTableComponent } from '@feature/records/components';

@Component({
  selector: 'suo-programming-project',
  standalone: true,
  imports: [RecordsTableComponent],
  providers: [RecordsApiService],
  templateUrl: './programming-project.component.html',
  styleUrl: './programming-project.component.scss',
})
export class ProgrammingProjectComponent {
  data: ProgrammingProjectGetResponse[] = [];
  records$: Subject<ProgrammingProjectGetResponse[] | 'loading'> = new Subject<
    ProgrammingProjectGetResponse[] | 'loading'
  >();

  constructor(private recordsApiService: RecordsApiService) {}

  columns: { key: string; label: string }[] = [
    { key: 'id', label: 'Id' },
    { key: 'category_id', label: 'Category Id' },
    { key: 'name', label: 'Name' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'importance', label: 'Importance' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'used_technologies', label: 'Used Technologies' },
    { key: 'description', label: 'Description' },
    { key: 'extra', label: 'Extra' },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadRecords();
  }

  async loadRecords() {
    this.records$.next('loading');
    const records: ProgrammingProjectGetResponse[] =
      await this.recordsApiService.getProgrammingProjects();
    this.records$.next(records);
  }
}
