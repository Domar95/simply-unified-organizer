import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { KnowledgeApiResponse } from '@feature/records/models';
import { RecordsApiService } from '@feature/records/services';
import { RecordsTableComponent } from '@feature/records/components';

@Component({
  selector: 'suo-knowledge',
  standalone: true,
  imports: [RecordsTableComponent],
  providers: [RecordsApiService],
  templateUrl: './knowledge.component.html',
  styleUrl: './knowledge.component.scss',
})
export class KnowledgeComponent {
  data: KnowledgeApiResponse[] = [];
  records$: Subject<KnowledgeApiResponse[] | 'loading'> = new Subject<
    KnowledgeApiResponse[] | 'loading'
  >();

  constructor(private recordsApiService: RecordsApiService) {}

  columns: { key: string; label: string }[] = [
    { key: 'id', label: 'Id' },
    { key: 'category_id', label: 'Category Id' },
    { key: 'name', label: 'Name' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'importance', label: 'Importance' },
    { key: 'domain', label: 'Domain' },
    { key: 'link', label: 'Link' },
    { key: 'image', label: 'Image' },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadRecords();
  }

  async loadRecords() {
    this.records$.next('loading');
    const records: KnowledgeApiResponse[] =
      await this.recordsApiService.getKnowledgeRecords();
    this.records$.next(records);
  }

  async handleRefresh() {
    await this.loadRecords();
  }

  async handleDelete(id: string) {
    await this.recordsApiService.deleteKnowledgeRecord(id);
    await this.loadRecords();
  }
}
