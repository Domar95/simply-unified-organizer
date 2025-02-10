import { Component } from '@angular/core';

import { RecordsTableComponent } from '@feature/records/components';
import { NoteApiResponse } from '@feature/records/models';
import { RecordsApiService } from '@feature/records/services';
import { NotificationService } from '@shared/services/notification.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'suo-note',
    imports: [RecordsTableComponent],
    providers: [RecordsApiService],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss'
})
export class NoteComponent {
  data: NoteApiResponse[] = [];
  records$: Subject<NoteApiResponse[] | 'loading' | 'error'> = new Subject<
    NoteApiResponse[] | 'loading' | 'error'
  >();

  constructor(
    private recordsApiService: RecordsApiService,
    private notificationService: NotificationService
  ) { }

  columns: { key: string; label: string }[] = [
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Name' },
    { key: 'text', label: 'Text' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'description', label: 'Description' },
    { key: 'importance', label: 'Importance' },
    { key: 'type', label: 'Type' },
    { key: 'link', label: 'Link' },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadRecords();
  }

  async loadRecords(): Promise<void> {
    this.records$.next('loading');
    try {
      const records: NoteApiResponse[] =
        await this.recordsApiService.getNoteRecords();
      this.records$.next(records);
    } catch (error) {
      console.error('Error loading records:', error);
      this.records$.next('error');
    }
  }

  async handleRefresh(): Promise<void> {
    await this.loadRecords();
  }

  async handleDelete(id: string) {
    try {
      await this.recordsApiService.deleteNoteRecord(id);
      this.notificationService.openSnackBar('Record deleted successfully!');
    } catch (error) {
      this.notificationService.openSnackBar(
        'Failed to delete record. Try again later.'
      );
    }
    await this.loadRecords();
  }
}
