import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'suo-records-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
  ],
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss',
})
export class RecordsTableComponent {
  @Input({ required: true }) records$!: Observable<
    unknown[] | 'loading' | 'error'
  >;
  @Input() columns!: { key: string; label: string }[];

  @Output() onRefresh: EventEmitter<void> = new EventEmitter<void>();
  // TODO: update to string once all records are migrated to MongoDB
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  columnKeys: string[] = [];
  loading: boolean = true;
  private recordsSubscription!: Subscription;

  dataSource: MatTableDataSource<unknown> = new MatTableDataSource<unknown>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit(): void {
    this.recordsSubscription = this.records$.subscribe(
      (records: unknown[] | 'loading' | 'error') => {
        this.loading = records === 'loading';
        this.updateTable(records);
      }
    );
    this.columnKeys = this.getColumnKeys();
  }

  private getColumnKeys(): string[] {
    const columnKeys = this.columns.map((column) => column.key);
    columnKeys.push('actions');
    return columnKeys;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.recordsSubscription.unsubscribe();
  }

  updateTable(records: unknown[] | 'loading' | 'error') {
    if (records === 'loading' || records === 'error') {
      return;
    }
    this.dataSource.data = records;
  }

  async addRecord() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
    });
  }

  async deleteRecord(id: string | number) {
    // TODO: update to string once all records are migrated to MongoDB
    this.onDelete.emit(id as any);
  }

  async refreshRecords() {
    this.onRefresh.emit();
  }

  get noDataMessage(): string {
    return this.loading ? 'Loading...' : 'No records found';
  }
}
