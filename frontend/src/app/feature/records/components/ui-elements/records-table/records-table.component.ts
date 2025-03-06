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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, Subscription } from 'rxjs';

import { RecordsTableData } from '@feature/records/models/records-table.model';

@Component({
  selector: 'suo-records-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss',
})
export class RecordsTableComponent {
  @Input({ required: true }) records$!: Observable<RecordsTableData>;
  @Input() columns!: { key: string; label: string }[];
  @Input() dateColumnKeys: string[] | undefined;

  @Output() onRefresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  columnKeys: string[] = [];
  state: 'loading' | 'error' | 'loaded' = 'loading';
  private recordsSubscription!: Subscription;

  dataSource: MatTableDataSource<unknown> = new MatTableDataSource<unknown>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit(): void {
    this.columnKeys = this.getColumnKeys();

    this.recordsSubscription = this.records$.subscribe(
      (records: RecordsTableData) => {
        if (records === 'loading' || records === 'error') {
          // TODO: Fix bug when old emission overrides actual state
          this.dataSource.data = [];
          this.state = records;
          return;
        }

        this.updateTable(records);
        this.state = 'loaded';
      }
    );
  }

  private updateTable(records: unknown[]): void {
    // TODO: Implement cleaner solution for updating table data
    this.columnKeys = this.getColumnKeys();
    this.dataSource = new MatTableDataSource<unknown>(records);
    this.dataSource.sort = this.sort;
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

  deleteRecord(id: string): void {
    this.onDelete.emit(id);
  }

  viewRecord(id: string): void {
    this.router.navigate(['view', id], {
      relativeTo: this.route,
    });
  }

  editRecord(id: string): void {
    this.router.navigate(['edit', id], {
      relativeTo: this.route,
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get noDataMessage(): string {
    switch (this.state) {
      case 'loading':
        return 'Loading...';
      case 'error':
        return 'Failed to load records';
      default:
        return 'No records found';
    }
  }

  isDateColumn(key: string): boolean {
    return !!this.dateColumnKeys?.includes(key);
  }

  isTruncated(element: HTMLElement): boolean {
    return element.offsetWidth < element.scrollWidth;
  }
}
