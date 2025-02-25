import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { RecordsTableColumns } from '../models/records-table.model';

@Component({
  selector: 'suo-records',
  imports: [MatTabsModule, RouterModule, RecordsTableComponent],
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
    {
      label: 'Note',
      route: 'note',
    },
  ];
  activeLink = this.tabs[0];

  strategy!: RecordStrategy;
  data: (
    | KnowledgeApiResponse
    | NoteApiResponse
    | ProgrammingProjectApiResponse
  )[] = [];
  records$: Subject<
    | (KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse)[]
    | 'loading'
    | 'error'
  > = new Subject<
    | (KnowledgeApiResponse | NoteApiResponse | ProgrammingProjectApiResponse)[]
    | 'loading'
    | 'error'
  >();

  constructor(
    private route: ActivatedRoute,
    private recordStrategyFactoryService: RecordStrategyFactoryService,
    private notificationService: NotificationService
  ) {}

  columns!: RecordsTableColumns;

  async ngOnInit(): Promise<void> {
    const category = this.route.snapshot.paramMap.get('category') || '';
    this.columns = columns[category];
    this.strategy = this.recordStrategyFactoryService.getStrategy(category);

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

  async handleRefresh(): Promise<void> {
    await this.loadRecords();
  }

  async handleDelete(id: string) {
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
