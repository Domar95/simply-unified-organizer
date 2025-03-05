import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';

import { RecordStrategyFactoryService } from '../services/record-strategy-factory.service';
import { NotificationService } from '@shared/services/notification.service';
import { RecordStrategy } from '../services/strategies';
import {
  KnowledgeApiResponse,
  NoteApiResponse,
  ProgrammingProjectApiResponse,
} from '../models';
import { RecordsTableComponent } from './ui-elements';
import { columns } from './records-columns';
import {
  RecordsTableColumns,
  RecordsTableData,
} from '../models/records-table.model';

@Component({
  selector: 'suo-records',
  imports: [RecordsTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent {
  @Input({ required: true }) category!: string;

  strategy!: RecordStrategy;
  records$: Subject<RecordsTableData> = new Subject<RecordsTableData>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordStrategyFactoryService: RecordStrategyFactoryService,
    private notificationService: NotificationService
  ) {}

  columns!: RecordsTableColumns;
  dateColumnKeys: string[] = ['created_at', 'updated_at', 'deadline'];

  ngOnChanges() {
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    this.columns = columns[this.category];
    this.strategy = this.recordStrategyFactoryService.getStrategy(
      this.category
    );
    await this.loadRecords();
  }

  async loadRecords(): Promise<void> {
    this.records$.next('loading');
    try {
      const records: (
        | KnowledgeApiResponse
        | NoteApiResponse
        | ProgrammingProjectApiResponse
      )[] = await this.strategy.getAllRecords();
      this.records$.next(records);
    } catch (error) {
      console.error('Error loading records:', error);
      this.records$.next('error');
    }
  }

  async refreshRecords(): Promise<void> {
    await this.loadRecords();
  }

  addRecord(): void {
    this.router.navigate(['new'], {
      relativeTo: this.route,
    });
  }

  async handleDelete(id: string): Promise<void> {
    try {
      await this.strategy.deleteRecord(id);
      this.notificationService.openSnackBar('Record deleted successfully!');
    } catch (error) {
      this.notificationService.openSnackBar(
        'Failed to delete record. Try again later.'
      );
    }
    await this.loadRecords();
  }
}
